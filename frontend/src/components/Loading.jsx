export default function Loading({ text = "Loading..." }) {
  return (
    <div className="state-card">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}
