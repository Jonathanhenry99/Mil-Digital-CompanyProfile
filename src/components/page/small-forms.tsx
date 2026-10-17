"use client";

import * as React from "react";
import { Check, Download, Loader2 } from "lucide-react";
import { applyForJob, joinWaitlist, requestReport, type SimpleState } from "@/app/(frontend)/actions";
import { cn } from "@/lib/utils";
import { CtaArrow, ctaClass } from "@/components/ui/cta-link";

const field =
  "w-full border-0 border-b border-line-strong bg-transparent px-0 pb-2.5 pt-1 text-[17px] outline-none transition-colors placeholder:text-fg-3 focus:border-foreground";

/** Shared submit plumbing: values survive errors, instant (bot) submits are dropped server-side. */
function useSimpleForm(action: (prev: SimpleState, form: FormData) => Promise<SimpleState>) {
  const [state, run, pending] = React.useActionState<SimpleState, FormData>(action, { status: "idle" });
  const startedAt = React.useRef(0);
  const onFocusCapture = () => {
    if (!startedAt.current) startedAt.current = Date.now();
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set("startedAt", String(startedAt.current));
    React.startTransition(() => run(data));
  };
  return { state, pending, formProps: { onSubmit, onFocusCapture, noValidate: true } };
}

function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
      <label>
        Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function Submit({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button type="submit" disabled={pending} className={ctaClass("primary", "lg", "disabled:opacity-70")}>
      {pending ? "Sending…" : children}
      {pending ? <Loader2 className="size-[18px] animate-spin" /> : <CtaArrow />}
    </button>
  );
}

function Done({ title, body, children }: { title: string; body: string; children?: React.ReactNode }) {
  return (
    <div role="status" className="border border-line bg-surface p-8">
      <span className="grid size-11 place-items-center bg-[var(--cta-bg)] text-white">
        <Check className="size-5" />
      </span>
      <p className="t-display mt-6 text-3xl">{title}</p>
      <p className="mt-3 max-w-md text-fg-2">{body}</p>
      {children}
    </div>
  );
}

/** Gated report: name, email, company → lead, then the download link. */
export function ReportGate({ slug, title, fileUrl }: { slug: string; title: string; fileUrl: string | null }) {
  const { state, pending, formProps } = useSimpleForm(requestReport);
  if (fileUrl) {
    return (
      <a href={fileUrl} target="_blank" rel="noopener noreferrer" className={ctaClass("primary")}>
        Download the report
        <Download className="size-[18px]" />
      </a>
    );
  }
  if (state.status === "success") {
    return state.fileUrl ? (
      <Done title="It's yours." body={`Thanks for your interest in ${title}.`}>
        <a href={state.fileUrl} target="_blank" rel="noopener noreferrer" className={ctaClass("primary", "lg", "mt-6")}>
          Download the PDF
          <Download className="size-[18px]" />
        </a>
      </Done>
    ) : (
      <Done title="You're on the list." body="The full PDF is being finalised. We'll email it to you as soon as it's ready." />
    );
  }
  return (
    <form {...formProps} className="relative grid gap-6">
      <Honeypot />
      <input type="hidden" name="report" value={slug} />
      <input name="name" autoComplete="name" placeholder="Your name" aria-label="Your name" className={field} />
      <input name="email" type="email" autoComplete="email" placeholder="Work email" aria-label="Work email" className={field} />
      <input name="company" autoComplete="organization" placeholder="Company / brand" aria-label="Company or brand" className={field} />
      {state.status === "error" ? <p className="text-sm text-destructive">{state.message}</p> : null}
      <div>
        <Submit pending={pending}>Get the report</Submit>
      </div>
    </form>
  );
}

/** ATLAS waitlist. */
export function WaitlistForm() {
  const { state, pending, formProps } = useSimpleForm(joinWaitlist);
  if (state.status === "success") {
    return <Done title="You're on the list." body="We'll invite you to ATLAS as soon as early access opens." />;
  }
  return (
    <form {...formProps} className="relative grid gap-6 md:grid-cols-[1fr_1fr_auto] md:items-end">
      <Honeypot />
      <input name="name" autoComplete="name" placeholder="Name" aria-label="Name" className={field} />
      <input name="email" type="email" autoComplete="email" placeholder="Email" aria-label="Email" className={field} />
      <Submit pending={pending}>Join the waitlist</Submit>
      {state.status === "error" ? <p className="text-sm text-destructive md:col-span-3">{state.message}</p> : null}
    </form>
  );
}

/** Career application: picks up the role chosen in the list above it. */
export function ApplicationForm({ jobs, selected }: { jobs: { id: number; title: string }[]; selected: number | null }) {
  const { state, pending, formProps } = useSimpleForm(applyForJob);
  const [job, setJob] = React.useState<string>(selected ? String(selected) : "");
  const [lastSelected, setLastSelected] = React.useState(selected);
  if (selected !== lastSelected) {
    setLastSelected(selected);
    setJob(selected ? String(selected) : "");
  }

  if (state.status === "success") {
    return <Done title="Application received." body="Thank you. Our team reviews every application and will contact you if there's a fit." />;
  }
  return (
    <form {...formProps} className="relative grid gap-7 md:grid-cols-2">
      <Honeypot />
      <label className="grid gap-2 md:col-span-2">
        <span className="t-label">Role</span>
        <select name="job" value={job} onChange={(e) => setJob(e.target.value)} className={cn(field, "cursor-pointer")}>
          <option value="">Open application</option>
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>
              {j.title}
            </option>
          ))}
        </select>
      </label>
      <input name="name" autoComplete="name" placeholder="Full name *" aria-label="Full name" className={field} />
      <input name="email" type="email" autoComplete="email" placeholder="Email *" aria-label="Email" className={field} />
      <input name="phone" type="tel" autoComplete="tel" placeholder="WhatsApp" aria-label="WhatsApp" className={field} />
      <input name="portfolio" type="url" placeholder="CV or portfolio link *" aria-label="CV or portfolio link" className={field} />
      <textarea name="message" rows={3} placeholder="Why MIL? (optional)" aria-label="Why MIL" className={cn(field, "resize-y md:col-span-2")} />
      {state.status === "error" ? <p className="text-sm text-destructive md:col-span-2">{state.message}</p> : null}
      <div className="md:col-span-2">
        <Submit pending={pending}>Send application</Submit>
      </div>
    </form>
  );
}
