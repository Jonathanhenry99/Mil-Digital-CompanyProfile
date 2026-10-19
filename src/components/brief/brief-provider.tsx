"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { getLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import { CtaArrow, ctaClass, SplitCta, splitCtaClass, type CtaVariant } from "@/components/ui/cta-link";
import { BriefPaper } from "./brief-paper";

const EASE = [0.22, 1, 0.36, 1] as const;

type Open = (service?: string, quiz?: string) => void;
const BriefContext = React.createContext<{ open: Open }>({ open: () => {} });
export const useBrief = () => React.useContext(BriefContext);

/**
 * Hosts the Brief sheet: any <BriefTrigger> on the page slides the paper
 * up over a dimmed page, optionally with a service already ticked.
 */
export function BriefProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<{ open: boolean; service?: string; quiz?: string; key: number }>({ open: false, key: 0 });
  const returnFocus = React.useRef<HTMLElement | null>(null);

  const open = React.useCallback<Open>((service, quiz) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setState((s) => ({ open: true, service, quiz, key: s.key + 1 }));
  }, []);
  const close = React.useCallback(() => setState((s) => ({ ...s, open: false })), []);

  React.useEffect(() => {
    if (!state.open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      returnFocus.current?.focus({ preventScroll: true });
    };
  }, [state.open, close]);

  const value = React.useMemo(() => ({ open }), [open]);

  return (
    <BriefContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {state.open ? (
          <div key={state.key} className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Brief MIL">
            <motion.div
              className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            />
            <div
              data-lenis-prevent
              className="absolute inset-0 overflow-y-auto overscroll-contain px-3 pb-3 pt-[12vh] md:pl-[28vw] md:pr-[1.5vw] md:pt-[18vh]"
              onClick={(e) => {
                if (e.target === e.currentTarget) close();
              }}
            >
              <motion.div
                initial={{ y: "110vh" }}
                animate={{ y: 0 }}
                exit={{ y: "110vh", transition: { duration: 0.6, ease: [0.55, 0, 0.75, 0.2] } }}
                transition={{ duration: 0.95, ease: EASE }}
                onAnimationComplete={() => {
                  document.querySelector<HTMLInputElement>('[role="dialog"] input[name="name"]')?.focus({ preventScroll: true });
                }}
              >
                <BriefPaper service={state.service} quiz={state.quiz} onClose={close} />
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </BriefContext.Provider>
  );
}

/** A button that opens the Brief sheet. Same look as <CtaLink>. */
export function BriefTrigger({
  service,
  quiz,
  variant = "primary",
  size = "lg",
  split = false,
  className,
  children,
}: {
  service?: string;
  /** Brand quiz answers to attach to the brief. */
  quiz?: string;
  variant?: CtaVariant;
  size?: "md" | "lg";
  /** Label pill plus a separate round arrow (see <SplitCta>). */
  split?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useBrief();
  if (split) {
    return (
      <button type="button" onClick={() => open(service, quiz)} className={cn(splitCtaClass, className)}>
        <SplitCta variant={variant} size={size}>
          {children}
        </SplitCta>
      </button>
    );
  }
  return (
    <button type="button" onClick={() => open(service, quiz)} className={ctaClass(variant, size, className)}>
      {children}
      <CtaArrow />
    </button>
  );
}
