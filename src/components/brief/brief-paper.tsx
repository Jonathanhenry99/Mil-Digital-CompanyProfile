"use client";

import * as React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { submitLead, type LeadState } from "@/app/(frontend)/actions";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { CtaArrow, ctaClass } from "@/components/ui/cta-link";

const SERVICES = ["Consultation", "Advertising", "Creative", "Not sure yet"];
const ACTIVITIES = ["Advertising", "Social Media", "Branding", "Influencer", "Others"];
// TBC with the MIL team: budget brackets.
const BUDGETS = ["Under Rp5 jt", "Rp5–20 jt", "Rp20–50 jt", "Rp50–100 jt", "Above Rp100 jt", "Not sure yet"];

const EASE = [0.22, 1, 0.36, 1] as const;

// Writing lines: one ink rule under each answer, nothing else.
const line =
  "w-full border-0 border-b border-paper-ink/85 bg-transparent px-0 pb-2.5 pt-1 text-[17px] text-paper-ink outline-none transition-[border-color,box-shadow] placeholder:text-paper-muted/80 focus:shadow-[0_1px_0_0_var(--paper-ink)] aria-invalid:border-destructive";

/** `01)  Label` with the answer underneath, on a 12% / rest grid like a printed form. */
function Row({ n, label, htmlFor, error, children }: { n: string; label: string; htmlFor?: string; error?: string; children: React.ReactNode }) {
  const Label = htmlFor ? "label" : "p";
  return (
    <div className="grid grid-cols-[12%_1fr] gap-x-4 py-6 md:py-7">
      <span className="pt-0.5 text-[14px] tabular-nums text-paper-muted">{n})</span>
      <div>
        <Label {...(htmlFor ? { htmlFor } : {})} className="block text-[16px] font-medium">
          {label}
        </Label>
        <div className="mt-3">{children}</div>
        {error ? <p className="mt-2 text-[13px] text-destructive">{error}</p> : null}
      </div>
    </div>
  );
}

/** Printed tick boxes: small grey squares that fill with ink and a tick. */
function Ticks({ name, options, type = "checkbox", defaults = [], cols = 2 }: { name: string; options: string[]; type?: "checkbox" | "radio"; defaults?: string[]; cols?: 2 | 3 }) {
  return (
    <div className={cn("grid gap-x-6 gap-y-3.5", cols === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2")}>
      {options.map((o) => (
        <label key={o} className="flex cursor-pointer items-center gap-3.5 text-[16px]">
          <input type={type} name={name} value={o} defaultChecked={defaults.includes(o)} className="peer sr-only" />
          <span
            aria-hidden
            className="relative grid size-[13px] shrink-0 place-items-center bg-[#8f8c86] transition-colors peer-checked:bg-paper-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-paper-ink peer-checked:[&>svg]:opacity-100"
          >
            <svg viewBox="0 0 10 10" className="size-2.5 text-paper opacity-0 transition-opacity">
              <path d="M1.5 5.2l2.2 2.2L8.5 2.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
          <span className="transition-colors peer-checked:font-medium">{o}</span>
        </label>
      ))}
    </div>
  );
}

/** A wire paper clip holding the sheet; the top half sits above the paper edge. */
function PaperClip() {
  return (
    <svg aria-hidden viewBox="0 0 26 84" className="absolute -top-9 left-[11%] h-[84px] w-[26px] drop-shadow-[1px_2px_1px_rgb(0_0_0/0.25)]">
      <path
        d="M9 30V12.5a5.5 5.5 0 0 1 11 0V62a9 9 0 0 1-18 0V20"
        fill="none"
        stroke="#9a9ea5"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * "Brief MIL": the free consultation form as a sheet of paper (fields from
 * MIL's free consultation form). Saves to CMS → Leads, then offers a
 * pre-written WhatsApp message to continue the conversation.
 */
export function BriefPaper({ service, quiz, className, onClose }: { service?: string; quiz?: string; className?: string; onClose?: () => void }) {
  const pathname = usePathname();
  const uid = React.useId().replace(/:/g, "");
  const id = (k: string) => `${uid}-${k}`;
  const [state, action, pending] = React.useActionState<LeadState, FormData>(submitLead, { status: "idle" });
  const err = state.status === "error" ? (state.fields ?? {}) : {};
  const invalid = (k: string) => (err[k] ? { "aria-invalid": true } : {});

  // First touch of the form; the server drops instant (bot) submits. A ref,
  // so re-renders after a validation error can't reset it.
  const startedAt = React.useRef(0);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set("startedAt", String(startedAt.current));
    React.startTransition(() => action(data));
  };

  return (
    <div className={cn("paper relative", className)}>
      <PaperClip />
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close brief"
          className="absolute right-3 top-3 z-10 grid size-11 place-items-center text-paper-ink transition-transform duration-300 hover:rotate-90"
        >
          <svg viewBox="0 0 18 18" className="size-4" aria-hidden>
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      ) : null}

      <div className="px-[clamp(22px,6vw,96px)] pt-[clamp(44px,5vw,80px)]">
        {/* Masthead */}
        <div className="grid grid-cols-[12%_1fr_auto] items-start gap-x-4 pb-[clamp(24px,3vw,44px)]">
          <small className="pt-2 text-[14px] text-paper-muted">01</small>
          <h2
            className="font-display text-[clamp(2.1rem,3.6vw,2.9rem)] font-semibold uppercase leading-[1] tracking-[-0.01em]"
            style={{ fontVariationSettings: '"wdth" 100, "opsz" 48' }}
          >
            Brief
            <br />
            MIL
          </h2>
          <div className="grid justify-items-end gap-2 pt-1">
            <Image src="/brand/mil-mark.png" alt="" width={1200} height={733} className="h-6 w-auto" />
            <span className="text-[11px] uppercase tracking-[0.14em] text-paper-muted">Free consultation</span>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {state.status === "success" ? (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: EASE }} className="relative grid grid-cols-[12%_1fr] gap-x-4 pb-12 pt-4" role="status">
              <span />
              <div>
                <span
                  aria-hidden
                  className="absolute right-0 top-0 border-[2.5px] border-signal px-3 py-1 font-display text-2xl font-bold uppercase tracking-wider text-signal opacity-90 mix-blend-multiply [animation:stamp_.7s_var(--ease)_.15s_both]"
                >
                  Received
                </span>
                <p className="font-display text-[2.4rem] font-semibold leading-tight">Thank you{state.name ? `, ${state.name}` : ""}.</p>
                <p className="mt-4 max-w-md text-[16px] leading-relaxed text-paper-muted">
                  Your brief is with our team. We&apos;ll reach out to schedule your free consultation, or continue the chat on
                  WhatsApp now.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(state.whatsapp || "Halo MIL Digital!")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ctaClass("ink")}
                  >
                    Continue on WhatsApp
                    <CtaArrow />
                  </a>
                  {onClose ? (
                    <button type="button" onClick={onClose} className="text-[15px] font-medium underline underline-offset-4">
                      Back to the site
                    </button>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              onFocusCapture={() => {
                if (!startedAt.current) startedAt.current = Date.now();
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              noValidate
            >
              <input type="hidden" name="pageOrigin" value={pathname} />
              {quiz ? <input type="hidden" name="quiz" value={quiz} /> : null}
              <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
                <label>
                  Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <Row n="01" label="Name" htmlFor={id("name")} error={err.name}>
                <input id={id("name")} name="name" autoComplete="name" placeholder="Full name" className={line} {...invalid("name")} />
              </Row>
              <Row n="02" label="Brand" htmlFor={id("brand")} error={err.brandName}>
                <div className="grid gap-x-8 gap-y-5 md:grid-cols-[1.4fr_1fr]">
                  <input id={id("brand")} name="brandName" autoComplete="organization" placeholder="Brand name" className={line} {...invalid("brandName")} />
                  <input name="industry" placeholder="Industry, e.g. F&B" aria-label="Industry" className={line} />
                </div>
              </Row>
              <Row n="03" label="How can we reach you?" htmlFor={id("email")} error={err.email || err.phone}>
                <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
                  <input id={id("email")} name="email" type="email" autoComplete="email" placeholder="Email" className={line} {...invalid("email")} />
                  <input name="phone" type="tel" autoComplete="tel" placeholder="WhatsApp, e.g. 0812…" aria-label="WhatsApp" className={line} {...invalid("phone")} />
                </div>
              </Row>
              <Row n="04" label="What do you need?">
                <Ticks name="services" options={SERVICES} defaults={service ? [service] : []} />
              </Row>
              <Row n="05" label="What have you tried so far?">
                <Ticks name="activities" options={ACTIVITIES} cols={3} />
              </Row>
              <Row n="06" label="Monthly ad budget">
                <Ticks name="budget" options={BUDGETS} type="radio" cols={3} />
              </Row>
              <Row n="07" label="Tell us about your brand" htmlFor={id("msg")} error={err.message}>
                {/* Ruled like a notebook: the lines sit under each row of text. */}
                <textarea
                  id={id("msg")}
                  name="message"
                  rows={3}
                  placeholder="Goals, current challenges, or what you'd like to change"
                  className="w-full resize-y border-0 bg-transparent px-0 text-[17px] leading-[2.9rem] text-paper-ink outline-none placeholder:text-paper-muted/80 aria-invalid:[background-image:repeating-linear-gradient(to_bottom,transparent_0,transparent_calc(2.9rem-1px),var(--destructive)_calc(2.9rem-1px),var(--destructive)_2.9rem)]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent 0, transparent calc(2.9rem - 1px), rgb(22 24 27 / .85) calc(2.9rem - 1px), rgb(22 24 27 / .85) 2.9rem)",
                    backgroundAttachment: "local",
                  }}
                  {...invalid("message")}
                />
              </Row>

              <div className="grid grid-cols-[12%_1fr] gap-x-4 pb-[clamp(40px,5vw,72px)] pt-4">
                <span />
                <div>
                  <button type="submit" disabled={pending} className={ctaClass("ink", "lg", "gap-10 disabled:opacity-70")}>
                    {pending ? "Sending…" : "Send brief"}
                    {pending ? <Loader2 className="size-[18px] animate-spin" /> : <CtaArrow />}
                  </button>
                  <p className="mt-4 max-w-md text-[14px] leading-relaxed text-paper-muted" aria-live="polite">
                    {state.status === "error" ? (
                      <span className="text-destructive">{state.message}</span>
                    ) : (
                      "Free 1x consultation, no commitment. Your brief goes straight to our team; we reply on WhatsApp or email."
                    )}
                  </p>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Foot of the sheet */}
      <div className="flex justify-between border-t border-paper-ink/85 px-[clamp(22px,6vw,96px)] py-4 text-[11px] uppercase tracking-[0.14em] text-paper-muted">
        <span>MIL / BDG</span>
        <span>Terima kasih</span>
        <span>@mildigital.id</span>
      </div>
    </div>
  );
}
