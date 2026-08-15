import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="state-card error-state">
      <AlertTriangle size={30} />
      <h3>Unable to load movies</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="button secondary" onClick={onRetry}>
          <RotateCcw size={16} /> Try again
        </button>
      )}
    </div>
  );
}
