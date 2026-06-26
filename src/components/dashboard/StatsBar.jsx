import './StatsBar.css';

export default function StatsBar({ stats }) {
  return (
    <div className="statsbar">
      <div className="stat-card">
        <span className="stat-number">{stats.total}</span>
        <span className="stat-label">Total tasks</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{stats.inProgress}</span>
        <span className="stat-label">In progress</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{stats.completed}</span>
        <span className="stat-label">Completed</span>
      </div>
    </div>
  );
}