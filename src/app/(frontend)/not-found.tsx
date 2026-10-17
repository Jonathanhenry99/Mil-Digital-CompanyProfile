import { CtaLink } from "@/components/ui/cta-link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-x relative py-32">
        <p className="eyebrow">404 — Signal lost</p>
        <h1 className="mt-6 text-[clamp(3rem,9vw,8rem)] font-medium leading-[0.92] tracking-[-0.045em]">
          This page is
          <br />
          <span className="text-signal-soft">still in the noise.</span>
        </h1>
        <p className="mt-8 max-w-md text-muted-foreground">
          It may have moved, or it&apos;s still being built. Here are a few good places to pick the signal back up.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <CtaLink href="/">Back to home</CtaLink>
          <CtaLink href="/our-works-case-study" variant="ghost">
            Our works
          </CtaLink>
          <CtaLink href="/contact-us" variant="ghost">
            Contact us
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
