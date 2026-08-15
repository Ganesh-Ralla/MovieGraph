import { Film } from "lucide-react";

export default function EmptyState({ title = "No movies found", text }) {
  return (
    <div className="state-card">
      <Film size={34} />
      <h3>{title}</h3>
      {text && <p>{text}</p>}
    </div>
  );
}
