export function Loading({ children = 'Loading…' }) {
  return <div className="state-message" role="status">{children}</div>;
}

export function ErrorMessage({ message }) {
  if (!message) return null;
  return <div className="error-message" role="alert">{message}</div>;
}

export function EmptyState({ title, message, action }) {
  return (
    <div className="state-message empty-state">
      <h2>{title}</h2>
      <p>{message}</p>
      {action}
    </div>
  );
}
