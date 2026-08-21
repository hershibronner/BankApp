interface EmptyStateProps {
  title: string
  hint?: string
}

export function EmptyState({ title, hint }: EmptyStateProps) {
  return (
    <div className="empty">
      <h2>{title}</h2>
      {hint && <p>{hint}</p>}
    </div>
  )
}
