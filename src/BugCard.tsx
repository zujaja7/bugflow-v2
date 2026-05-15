type Severity = "Highest" | "High" | "Medium" | "Low";
type Status =
  | "New"
  | "Open"
  | "Assigned"
  | "Fixed"
  | "Verified"
  | "Closed"
  | "Reopened";

interface BugCardProps {
  bugTitle: string;
  bugSeverity: Severity;
  bugStatus: Status;
  bugDescription: string;
  lastUpdatedDisplay: string;
  onEdit: () => void;
  onDelete: () => void;
}

function BugCard({
  bugTitle,
  bugSeverity,
  bugStatus,
  bugDescription,
  lastUpdatedDisplay,
  onEdit,
  onDelete,
}: BugCardProps) {
  return (
    <div className="issue-card">
      <div className="issue-meta">
        <span
          className={`badge severity-${bugSeverity.toLowerCase().replaceAll(" ", "-")}`}
        >
          {bugSeverity}
        </span>

        <span
          className={`badge status-${bugStatus.toLowerCase().replaceAll(" ", "-")}`}
        >
          {bugStatus}
        </span>
        <span className="updated-time">Updated {lastUpdatedDisplay}</span>
      </div>
      <h3 className="issue-title">{bugTitle}</h3>
      <p className="issue-description">{bugDescription}</p>
      <div className="issue-actions">
        <button
          className="icon-button edit-button"
          onClick={onEdit}
          aria-label="Edit bug"
        >
          ✎
        </button>

        <button
          className="icon-button delete-button"
          onClick={onDelete}
          aria-label="Delete bug"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default BugCard;
