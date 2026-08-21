/** Marks a screen that is scaffolded but not yet built, so the shell is navigable. */
export function PhasePlaceholder({
  title,
  summary,
  phase,
}: {
  title: string
  summary: string
  phase: string
}) {
  return (
    <section className="panel p-6 sm:p-8">
      <p className="eyebrow">{phase}</p>
      <h1 className="mt-3 text-xl font-semibold">{title}</h1>
      <p className="mt-2 max-w-prose text-sm text-content-dim">{summary}</p>
    </section>
  )
}
