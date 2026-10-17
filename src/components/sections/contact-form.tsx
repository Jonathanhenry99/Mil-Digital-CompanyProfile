"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Loader2, MapPin, MessageCircle } from "lucide-react";
import { submitLead, type LeadState } from "@/app/(frontend)/actions";
import { site } from "@/content/site";
import { whatsappHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { CtaLink } from "@/components/ui/cta-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { SectionEntrance } from "@/components/motion/section-entrance";
import { SplitText } from "@/components/motion/split-text";

const EASE = [0.16, 1, 0.3, 1] as const;
const ACTIVITIES = ["Advertising", "Social Media", "Branding", "Influencer", "Others"];
// TBC with the MIL team: budget brackets.
const BUDGETS = ["< Rp5 jt / bulan", "Rp5–20 jt / bulan", "Rp20–50 jt / bulan", "Rp50–100 jt / bulan", "> Rp100 jt / bulan", "Belum tahu"];

const input =
  "w-full rounded-xl border border-line-strong bg-background px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-signal focus:ring-3 focus:ring-signal/15 aria-invalid:border-destructive";

function Field({
  label,
  name,
  error,
  required,
  className,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
        {required ? <span className="text-signal"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Homepage contact form (page inventory: "contact-us form"). Fields follow
 * MIL's free consultation form; submissions land in CMS → Leads.
 * Welcoming: the sheet tips up, the copy slides in from the left and the
 * form card rises in from the right.
 */
export function ContactForm() {
  const pathname = usePathname();
  const [state, action, pending] = React.useActionState<LeadState, FormData>(submitLead, { status: "idle" });
  // When the visitor first touched the form; the server drops instant (bot)
  // submits. Kept in a ref, not a hidden input, so re-renders after a
  // validation error can't reset the clock.
  const startedAt = React.useRef(0);
  const markStart = () => {
    if (!startedAt.current) startedAt.current = Date.now();
  };
  // Submitted from onSubmit rather than the `action` prop: React resets a
  // form after an action prop runs, which would wipe the visitor's answers
  // whenever validation fails.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set("startedAt", String(startedAt.current));
    React.startTransition(() => action(data));
  };
  const err = state.status === "error" ? state.fields ?? {} : {};
  const aria = (name: string) =>
    err[name] ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {};

  return (
    <SectionEntrance id="contact" variant="tilt" sheetClassName="bg-background">
      <div className="container-x grid gap-14 py-24 md:py-36 lg:grid-cols-12">
        <Reveal variant="left" className="lg:col-span-5">
          <Eyebrow index="11">Contact us</Eyebrow>
          <SplitText
            as="h2"
            text={"Tell us about\nyour brand."}
            className="mt-6 text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.04em]"
          />
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Get a free 1x consultation with our certified digital marketing experts. Share a little about your brand and
            we&apos;ll get back to you.
          </p>

          <div className="mt-10 space-y-3">
            <a
              href={whatsappHref(pathname)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-signal"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-brand-gradient text-white">
                <MessageCircle className="size-5" />
              </span>
              <span className="flex-1">
                <span className="block text-sm text-muted-foreground">Prefer to chat?</span>
                <span className="block font-medium">WhatsApp {site.whatsappDisplay}</span>
              </span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-signal"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-surface-raised text-signal">
                <MapPin className="size-5" />
              </span>
              <span className="flex-1">
                <span className="block text-sm text-muted-foreground">Visit us</span>
                <span className="block font-medium">{site.address}</span>
              </span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>

        <Reveal variant="right" delay={0.1} className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-[0_40px_80px_-48px_rgb(var(--shadow-tint)/0.45)] md:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {state.status === "success" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex min-h-[520px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
                    className="flex size-16 items-center justify-center rounded-full bg-brand-gradient text-white"
                  >
                    <Check className="size-8" />
                  </motion.span>
                  <h3 className="mt-6 text-3xl font-medium tracking-tight">
                    Thank you{state.name ? `, ${state.name}` : ""}!
                  </h3>
                  <p className="mt-3 max-w-sm text-muted-foreground">
                    Your request is in. Our team will reach out to schedule your free consultation.
                  </p>
                  <CtaLink href={whatsappHref(pathname)} variant="ghost" className="mt-8">
                    Or chat with us now
                  </CtaLink>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  onFocusCapture={markStart}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-5 md:grid-cols-2"
                  noValidate
                >
                  <input type="hidden" name="pageOrigin" value={pathname} />
                  {/* Honeypot: hidden from people, tempting for bots */}
                  <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
                    <label>
                      Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  <Field label="Name" name="name" required error={err.name}>
                    <input id="name" name="name" autoComplete="name" className={input} {...aria("name")} />
                  </Field>
                  <Field label="Email" name="email" required error={err.email}>
                    <input id="email" name="email" type="email" autoComplete="email" className={input} {...aria("email")} />
                  </Field>
                  <Field label="Phone / WhatsApp" name="phone" required error={err.phone}>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="08xx" className={input} {...aria("phone")} />
                  </Field>
                  <Field label="Brand name" name="brandName" required error={err.brandName}>
                    <input id="brandName" name="brandName" autoComplete="organization" className={input} {...aria("brandName")} />
                  </Field>
                  <Field label="Brand industry" name="industry">
                    <input id="industry" name="industry" placeholder="e.g. F&B, fashion, property" className={input} />
                  </Field>
                  <Field label="Location" name="location">
                    <input id="location" name="location" placeholder="City" className={input} />
                  </Field>
                  <Field label="Advertising budget" name="budget" className="md:col-span-2">
                    <select id="budget" name="budget" defaultValue="" className={input}>
                      <option value="" disabled>
                        Select a range
                      </option>
                      {BUDGETS.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </Field>

                  <fieldset className="md:col-span-2">
                    <legend className="mb-3 text-sm font-medium">Digital marketing you&apos;ve tried</legend>
                    <div className="flex flex-wrap gap-2">
                      {ACTIVITIES.map((a) => (
                        <label key={a} className="cursor-pointer">
                          <input type="checkbox" name="activities" value={a} className="peer sr-only" />
                          <span className="inline-flex rounded-full border border-line-strong px-4 py-2 text-sm transition-colors peer-checked:border-signal peer-checked:bg-signal peer-checked:text-white peer-focus-visible:ring-3 peer-focus-visible:ring-signal/30">
                            {a}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <Field label="What would you like to discuss?" name="message" required error={err.message} className="md:col-span-2">
                    <textarea id="message" name="message" rows={4} className={cn(input, "resize-y")} {...aria("message")} />
                  </Field>

                  <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
                    <p className="text-sm text-muted-foreground" aria-live="polite">
                      {state.status === "error" ? <span className="text-destructive">{state.message}</span> : "Free, no commitment."}
                    </p>
                    <button
                      type="submit"
                      disabled={pending}
                      className="bg-brand-gradient inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium text-white shadow-[0_12px_32px_-12px_rgb(11_107_203/0.65)] transition hover:brightness-110 disabled:opacity-70"
                    >
                      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
                      {pending ? "Sending…" : "Get my free consultation"}
                      {pending ? null : <ArrowUpRight className="size-4" />}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </SectionEntrance>
  );
}
