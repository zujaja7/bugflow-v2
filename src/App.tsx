import "./App.css";
import { useEffect, useState } from "react";
import BugCard from "./BugCard";
import type { Bug, Estimate, Priority, Severity, Status } from "./types";
import { formatLastUpdated, getBugTimestampLabel } from "./dateUtils";
import {
  estimateOptions,
  priorityOptions,
  severityOptions,
  statusOptions,
} from "./options";
const STORAGE_KEY = "bugs-v2";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bugs, setBugs] = useState<Bug[]>(() => {
    const savedBugs = localStorage.getItem(STORAGE_KEY);

    if (savedBugs) {
      try {
        return JSON.parse(savedBugs) as Bug[];
      } catch (error) {
        console.error("Failed to parse saved bugs:", error);
        return [];
      }
    }

    return [];
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity | "">("");
  const [priority, setPriority] = useState<Priority | "">("");
  const [status, setStatus] = useState<Status | "">("");
  const [estimate, setEstimate] = useState<Estimate | "">("");
  const [submitted, setSubmitted] = useState(false);
  const [editingBugId, setEditingBugId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");
  const [severityFilter, setSeverityFilter] = useState<Severity | "All">("All");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "All">("All");
  const getStatusCount = (status: Status) => {
    return bugs.filter((bug) => bug.bugStatus === status).length;
  };
  const openCount = getStatusCount("Open");
  const fixedCount = getStatusCount("Fixed");
  const newCount = getStatusCount("New");
  const assignedCount = getStatusCount("Assigned");

  const closedCount = getStatusCount("Closed");
  const reopenedCount = getStatusCount("Reopened");
  const totalBugs = bugs.length;
  const lastUpdatedBug = [...bugs].sort((a, b) => b.updatedAt - a.updatedAt)[0];

  const lastUpdatedText = formatLastUpdated(lastUpdatedBug?.updatedAt);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bugs));
  }, [bugs]);
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSeverity("");
    setPriority("");
    setStatus("");
    setEstimate("");
    setSubmitted(false);
    setEditingBugId(null);
  };
  const handleResetFilters = () => {
    setSearchText("");
    setSeverityFilter("All");
    setPriorityFilter("All");
    setStatusFilter("All");
  };
  const handleSaveBug = () => {
    const now = new Date();
    if (!title || !description || !severity || !status) {
      setSubmitted(true);
      return;
    }

    if (editingBugId !== null) {
      const updatedBugs = bugs.map((bug) => {
        if (bug.id === editingBugId) {
          return {
            ...bug,
            bugTitle: title,
            bugDescription: description,
            bugSeverity: severity,
            bugPriority: priority,
            bugStatus: status,
            bugEstimate: estimate,
            updatedAt: now.getTime(),
          };
        }
        return bug;
      });
      setBugs(updatedBugs);
    } else {
      const newBug = {
        id: Date.now(),
        bugTitle: title,
        bugDescription: description,
        bugSeverity: severity,
        bugPriority: priority,
        bugStatus: status,
        bugEstimate: estimate,
        createdAt: now.getTime(),
        updatedAt: now.getTime(),
      };
      setBugs([...bugs, newBug]);
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleNewBug = () => {
    resetForm();
    setIsModalOpen(true);
  };
  const handleEditBug = (bug: Bug) => {
    setEditingBugId(bug.id);
    setTitle(bug.bugTitle);
    setDescription(bug.bugDescription);
    setSeverity(bug.bugSeverity);
    setPriority(bug.bugPriority);
    setStatus(bug.bugStatus);
    setEstimate(bug.bugEstimate);
    setSubmitted(false);
    setIsModalOpen(true);
  };
  const handleDeleteBug = (id: number) => {
    setBugs(bugs.filter((bug) => bug.id !== id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const filteredBugs = bugs.filter((bug) => {
    const title = bug.bugTitle.toLowerCase();
    const description = bug.bugDescription.toLowerCase();
    const search = searchText.toLowerCase();
    const matchesSearch =
      title.includes(search) || description.includes(search);
    const matchesSeverity =
      severityFilter === "All" || bug.bugSeverity === severityFilter;
    const matchesStatus =
      statusFilter === "All" || bug.bugStatus === statusFilter;
    const matchesPriority =
      priorityFilter === "All" || bug.bugPriority === priorityFilter;
    return matchesSearch && matchesSeverity && matchesStatus && matchesPriority;
  });
  return (
    <div className="app-container">
      {/*Header Section*/}
      <header className="app-header">
        <div className="brand-area">
          <h1 className="title">BugFlow</h1>
          <h2 className="subtitle">
            Track issues, organize fixes, ship cleaner releases
          </h2>
        </div>

        <div className="actions-area">
          <div className="search-box">
            <span className="search-icon">⌕</span>
            <input
              type="search"
              placeholder="Search issues..."
              className="search-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <button className="add-bug-button" onClick={handleNewBug}>
            + New Bug
          </button>
        </div>
      </header>
      {/*Main Content Area*/}

      <div className="app-layout">
        <div className="overview-panel">
          <h2 className="overview-title">OVERVIEW</h2>
          <h3>Filters</h3>
          <div className="filter-field">
            <label htmlFor="severity"> Severity </label>
            <select
              id="severity"
              className="dropdown"
              value={severityFilter}
              onChange={(e) =>
                setSeverityFilter(e.target.value as Severity | "All")
              }
            >
              <option value="All">All</option>
              {severityOptions.map((severityOption) => (
                <option key={severityOption} value={severityOption}>
                  {severityOption}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="priority"> Priority </label>
            <select
              id="priority"
              className="dropdown"
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value as Priority | "All")
              }
            >
              <option value="All">All</option>
              {priorityOptions.map((priorityOption) => (
                <option key={priorityOption} value={priorityOption}>
                  {priorityOption}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="status"> Status </label>
            <select
              id="status"
              className="dropdown"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as Status | "All")
              }
            >
              <option value="All">All</option>
              {statusOptions.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
          </div>

          <button className="reset-filters-button" onClick={handleResetFilters}>
            Reset filters
          </button>

          <h3>Quick stats</h3>
          <div className="stat-row">
            <span>Total Bugs</span>
            <span>{totalBugs}</span>
          </div>
          <div className="stat-row">
            <span>New</span>
            <span>{newCount}</span>
          </div>
          <div className="stat-row">
            <span>Open</span>
            <span>{openCount}</span>
          </div>
          <div className="stat-row">
            <span>Assigned</span>
            <span>{assignedCount}</span>
          </div>
          <div className="stat-row">
            <span>Fixed</span>
            <span>{fixedCount}</span>
          </div>

          <div className="stat-row">
            <span>Closed</span>
            <span>{closedCount}</span>
          </div>
          <div className="stat-row">
            <span>Reopened</span>
            <span>{reopenedCount}</span>
          </div>

          <div className="last-updated">
            <h3>Last Updated</h3>
            <p className="last-updated-value">
              <span className="clock-icon">◷</span>
              {lastUpdatedText}
            </p>
          </div>
        </div>
        <div className="recent-issues-panel">
          <h2 className="recent-issues-title">RECENT ISSUES</h2>

          {filteredBugs.length === 0 ? (
            <p className="empty-state">No results found</p>
          ) : (
            [...filteredBugs]
              .sort((a, b) => b.updatedAt - a.updatedAt)
              .map((bug) => (
                <BugCard
                  key={bug.id}
                  bugTitle={bug.bugTitle}
                  bugSeverity={bug.bugSeverity}
                  bugStatus={bug.bugStatus}
                  bugDescription={bug.bugDescription}
                  lastUpdatedDisplay={getBugTimestampLabel(bug)}
                  onEdit={() => handleEditBug(bug)}
                  onDelete={() => handleDeleteBug(bug.id)}
                />
              ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h2 className="Title">
                {editingBugId === null ? "New Bug" : "Edit Bug"}
              </h2>
              <button onClick={closeModal}>✕</button>
            </div>
            <div className="title-description">
              <label>Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter your Bug title"
                className="title-input"
              />
              {submitted && !title && (
                <p className="error">* Title is required</p>
              )}
              <label>Description</label>
              <textarea
                className="description-area"
                placeholder="Enter your Bug Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
              {submitted && !description && (
                <p className="error">* Description is required</p>
              )}
            </div>
            <div className="bug-properties">
              <div className="property-field">
                <label htmlFor="modal-severity">Severity</label>
                <select
                  id="modal-severity"
                  onChange={(e) => setSeverity(e.target.value as Severity)}
                  value={severity}
                >
                  <option value="" disabled hidden>
                    Select Severity
                  </option>
                  {severityOptions.map((severityOption) => (
                    <option key={severityOption} value={severityOption}>
                      {severityOption}
                    </option>
                  ))}
                </select>
                {submitted && !severity && (
                  <p className="error">* Severity is required</p>
                )}
              </div>
              <div className="property-field">
                <label htmlFor="modal-priority">Priority</label>
                <select
                  id="modal-priority"
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  value={priority}
                >
                  <option value="" disabled hidden>
                    Select Priority
                  </option>
                  {priorityOptions.map((priorityOption) => (
                    <option key={priorityOption} value={priorityOption}>
                      {priorityOption}
                    </option>
                  ))}
                </select>
              </div>
              <div className="property-field">
                <label htmlFor="modal-status">Status</label>
                <select
                  id="modal-status"
                  onChange={(e) => setStatus(e.target.value as Status)}
                  value={status}
                >
                  <option value="" disabled hidden>
                    Select Status
                  </option>
                  {statusOptions.map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                      {statusOption}
                    </option>
                  ))}
                </select>
                {submitted && !status && (
                  <p className="error">* Status is required</p>
                )}
              </div>

              <div className="property-field">
                <label htmlFor="modal-estimate">Estimate</label>
                <select
                  id="modal-estimate"
                  onChange={(e) => setEstimate(e.target.value as Estimate)}
                  value={estimate}
                >
                  <option value="" disabled hidden>
                    Select Estimate
                  </option>
                  {estimateOptions.map((estimateOption) => (
                    <option key={estimateOption} value={estimateOption}>
                      {estimateOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
              <button className="save-bug-button" onClick={handleSaveBug}>
                {editingBugId === null ? "Save Bug" : "Update Bug"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
