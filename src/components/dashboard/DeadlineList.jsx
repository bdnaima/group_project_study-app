import './DeadlineList.css';

const statusLabel = {
  "in-progress": "In progress",
  "todo": "To do",
  "done": "Done",
};

export default function DeadlineList({ tasks }) {
  return (
    <div className="deadline-list">
      <div className="deadline-list-header">
        <h2>Upcoming Deadlines</h2>
        <a href="#">View all</a>
      </div>
      <ul>
        {tasks.map(task => (
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