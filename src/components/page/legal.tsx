/**
 * Layout for the legal pages: a readable column on a light ground with a
 * sticky list of sections. The copy is a starting draft for legal review.
 */
export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string[] }[] }) {
  return (
    <article>
      <header data-ground="#0c0d0f" className="container-x pb-14 pt-36 md:pt-44">
        <p className="t-label">Legal</p>
        <h1 className="t-display mt-4 text-[clamp(3rem,7vw,6.5rem)]">{title}</h1>
        <p className="t-label mt-6">Last updated {updated} · Draft pending legal review</p>
      </header>
      <div className="theme-light">
      <div className="container-x grid gap-12 pb-[var(--sec)] pt-12 lg:grid-cols-12">
        <nav aria-label="Sections" className="lg:col-span-3">
          <ol className="space-y-2 text-[15px] text-fg-2 lg:sticky lg:top-28">
            {sections.map((s, i) => (
              <li key={s.h}>
                <a href={`#s${i + 1}`} className="hover:text-foreground">
                  {String(i + 1).padStart(2, "0")} · {s.h}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-[42em] lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <section key={s.h} id={`s${i + 1}`} className="mb-12 scroll-mt-28">
              <h2 className="font-display text-[1.7rem] font-semibold tracking-[-0.02em]">
                {String(i + 1).padStart(2, "0")}. {s.h}
              </h2>
              {s.p.map((para) => (
                <p key={para} className="mt-4 text-[17px] leading-[1.75] text-fg-body">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
      </div>
    </article>
  );
}
