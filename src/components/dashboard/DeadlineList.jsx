import { useState } from 'react';
import './DeadlineList.css';

const statusLabel = {
  "in-progress": "In progress",
  "todo": "To do",
  "done": "Done",
};

export default function DeadlineList({ tasks }) {
  const [showAll, setShowAll] = useState(false);

  const visibleTasks = showAll ? tasks : tasks.slice(0, 3);

  return (
    <div className="deadline-list">
      <div className="deadline-list-header">
        <h2>Upcoming Deadlines</h2>
        {tasks.length > 3 && (
          <button className="view-all-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show less" : "View all"}
          </button>
        )}
      </div>
      <ul>
        {visibleTasks.map(task => (
          <li key={task.id} className="deadline-item">
            <div className="deadline-icon">📅</div>
            <div className="deadline-info">
              <span className="deadline-title">{task.title}</span>
              <span className="deadline-due">Due: {task.dueDate}</span>
            </div>
            <span className={`deadline-status status-${task.status}`}>
              {statusLabel[task.status]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}