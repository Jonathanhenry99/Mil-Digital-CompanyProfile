"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { engagement, questions, results, type Score } from "@/content/quiz";
import { whatsappHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { CtaLink, TextLink } from "@/components/ui/cta-link";
import { BriefTrigger } from "@/components/brief/brief-provider";
import { CaseCard } from "./blocks";

type CaseLike = Parameters<typeof CaseCard>[0]["c"] & { services: string[] };
const EASE = [0.22, 1, 0.36, 1] as const;
const KEYS = "ABCDE";

/**
 * The brand quiz: one question per screen, keyboard friendly (A–E to pick,
 * Enter to continue), answers kept for the session. Ends with a
 * recommendation, the reasons behind it, a matching case study, and a
 * Brief that carries the answers so the consultant arrives prepared.
 */
export function Quiz({ cases }: { cases: CaseLike[] }) {
  const [step, setStep] = React.useState(-1); // -1 intro, questions.length = result
  const [answers, setAnswers] = React.useState<Record<string, number[]>>({});
  const q = questions[step];
  const done = step >= questions.length;

  const pick = React.useCallback(
    (i: number) => {
      if (!q) return;
      setAnswers((a) => {
        const cur = a[q.id] ?? [];
        const next = q.multi ? (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]) : [i];
        return { ...a, [q.id]: next };
      });
      if (!q.multi) window.setTimeout(() => setStep((s) => s + 1), 320);
    },
    [q],
  );

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!q) return;
      const k = KEYS.indexOf(e.key.toUpperCase());
      if (k >= 0 && k < q.options.length) pick(k);
      if (e.key === "Enter" && (answers[q.id]?.length ?? 0) > 0) setStep((s) => s + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [q, pick, answers]);

  // Score
  const total: Required<Score> = { consulting: 0, advertising: 0, creative: 0, preliminary: 0, retainer: 0 };
  const reasons: string[] = [];
  let industry: string | undefined;
  for (const qq of questions) {
    for (const i of answers[qq.id] ?? []) {
      const o = qq.options[i];
      for (const [k, v] of Object.entries(o.score)) total[k as keyof Score] += v ?? 0;
      if (o.reason) reasons.push(o.reason);
      if (o.industry) industry = o.industry;
    }
  }
  const ranked = (["consulting", "advertising", "creative"] as const).slice().sort((a, b) => total[b] - total[a]);
  const top = results[ranked[0]];
  const second = results[ranked[1]];
  const model = total.retainer > total.preliminary ? engagement.retainer : engagement.preliminary;
  const match = cases.find((c) => c.services.includes(top.caseService) && (!industry || c.industry === industry)) ?? cases.find((c) => c.services.includes(top.caseService));
  const summary = questions
    .map((qq) => `${qq.title} ${(answers[qq.id] ?? []).map((i) => qq.options[i].label).join(", ") || "-"}`)
    .concat([`Recommended: ${top.service} (${model.name})`])
    .join("\n");

  const progress = Math.max(0, Math.min(step, questions.length)) / questions.length;

  return (
    <section data-ground="#0e1f45" className="relative min-h-svh pb-20 pt-32 md:pt-40" aria-label="Brand quiz">
      <div className="container-x">
        {/* Segmented progress */}
        <div className="flex gap-1.5" aria-hidden>
          {questions.map((qq, i) => (
            <span key={qq.id} className="h-0.5 flex-1 bg-line">
              <span className="block h-full origin-left bg-signal transition-transform duration-500" style={{ transform: `scaleX(${i < Math.max(step, 0) || done ? 1 : 0})` }} />
            </span>
          ))}
        </div>
        <p className="t-label mt-4 tabular-nums" aria-live="polite">
          {step < 0 ? "Get to know your brand" : done ? "Your recommendation" : `Question ${step + 1} of ${questions.length}`}
          <span className="sr-only">{Math.round(progress * 100)}% complete</span>
        </p>

        <AnimatePresence mode="wait">
          {step < 0 ? (
            <motion.div key="intro" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6, ease: EASE }} className="mt-12 max-w-4xl">
              <h1 className="t-display text-[clamp(3rem,7vw,7rem)]">Which service fits your brand?</h1>
              <p className="t-body mt-6 text-lg">Six quick questions, about a minute. You&apos;ll get a recommended service, an engagement model and the reasons behind it.</p>
              <button type="button" onClick={() => setStep(0)} className="mt-10 inline-flex h-[52px] items-center gap-6 [background:var(--cta-bg)] pl-6 pr-[18px] text-sm font-semibold text-white transition-colors hover:[background:var(--cta-bg-hover)]">
                Start the quiz →
              </button>
            </motion.div>
          ) : !done && q ? (
            <motion.div key={q.id} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.5, ease: EASE }} className="mt-12">
              <fieldset>
                <legend className="t-display max-w-4xl text-[clamp(2.2rem,5vw,4.6rem)]">{q.title}</legend>
                {q.multi ? <p className="t-label mt-4">Pick all that apply</p> : null}
                <div className="mt-10 grid gap-3 md:grid-cols-2">
                  {q.options.map((o, i) => {
                    const on = (answers[q.id] ?? []).includes(i);
                    return (
                      <button
                        key={o.label}
                        type="button"
                        role={q.multi ? "checkbox" : "radio"}
                        aria-checked={on}
                        onClick={() => pick(i)}
                        className={cn(
                          "group flex items-center gap-5 border p-5 text-left text-lg transition-[background-color,border-color,transform] duration-300 active:scale-[0.99]",
                          on ? "border-signal bg-signal/10" : "border-line-strong hover:border-foreground/60",
                        )}
                      >
                        <span className={cn("grid size-8 shrink-0 place-items-center border text-[13px] font-semibold transition-colors", on ? "border-signal bg-signal text-white" : "border-line-strong text-fg-2")}>
                          {KEYS[i]}
                        </span>
                        {o.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <div className="mt-10 flex items-center gap-6">
                <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-2 text-sm text-fg-2 hover:text-foreground">
                  <ArrowLeft className="size-4" /> Back
                </button>
                {q.multi ? (
                  <button
                    type="button"
                    disabled={!(answers[q.id]?.length)}
                    onClick={() => setStep((s) => s + 1)}
                    className="inline-flex h-11 items-center [background:var(--cta-bg)] px-5 text-[13px] font-semibold text-white transition-colors hover:[background:var(--cta-bg-hover)] disabled:opacity-40"
                  >
                    Continue →
                  </button>
                ) : null}
                <span className="t-label hidden md:inline">Tip: press A–{KEYS[q.options.length - 1]}{q.multi ? ", then Enter" : ""}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="mt-12 grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="t-label">We recommend</p>
                <h1 className="t-display mt-4 text-[clamp(2.8rem,6vw,6rem)]">{top.service}</h1>
                <p className="t-body mt-5 text-lg">{top.line}</p>
                <div className="mt-8 border border-line p-6">
                  <p className="t-label">Engagement model</p>
                  <p className="t-display mt-2 text-3xl">{model.name}</p>
                  <p className="mt-2 text-[15px] text-fg-2">{model.line}</p>
                </div>
                {reasons.length ? (
                  <div className="mt-8">
                    <p className="t-label">Why</p>
                    <ul className="mt-3 space-y-2 text-[16px] text-fg-body">
                      {reasons.slice(0, 3).map((r) => (
                        <li key={r} className="flex gap-3">
                          <span className="mt-2.5 size-1.5 shrink-0 bg-signal" />
                          Because {r}.
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <p className="mt-6 text-[15px] text-fg-2">
                  Also a good fit:{" "}
                  <Link href={second.href} className="text-foreground underline underline-offset-4">
                    {second.service}
                  </Link>
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <BriefTrigger service={top.brief} quiz={summary}>
                    Book a free consultation
                  </BriefTrigger>
                  <CtaLink href={whatsappHref("/get-to-know-your-brand", `Halo MIL Digital, saya baru ikut brand quiz.\n\n${summary}`)} variant="ghost">
                    Send on WhatsApp
                  </CtaLink>
                </div>
                <button type="button" onClick={() => { setAnswers({}); setStep(0); }} className="mt-6 text-sm text-fg-2 underline underline-offset-4 hover:text-foreground">
                  Retake the quiz
                </button>
              </div>
              {match ? (
                <div className="lg:col-span-4 lg:col-start-9">
                  <p className="t-label mb-4">Work like this</p>
                  <CaseCard c={match} sizes="(min-width: 1024px) 30vw, 100vw" />
                  <div className="mt-6">
                    <TextLink href={top.href}>About {top.service}</TextLink>
                  </div>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
