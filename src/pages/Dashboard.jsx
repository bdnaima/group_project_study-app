import StatsBar from '../components/dashboard/Statsbar.jsx';
import DeadlineList from '../components/dashboard/DeadlineList';
import CalendarView from '../components/dashboard/CalendarView';
import './Dashboard.css';

export default function Dashboard() {
  const raw = JSON.parse(localStorage.getItem("my_study_tasks") || "[]");

  const tasks = raw.map(task => ({
    id: task.id,
    title: task.title,
    subject: task.category,
    dueDate: task.dueDate,
    status: task.status === "Done" ? "done"
      : task.status === "Todo" ? "todo"
        : "in-progress",
  })).sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const stats = {
    total: tasks.length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    completed: tasks.filter(t => t.status === "done").length,
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const name = currentUser.fullName || "Student";

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Your Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back, {name}!</p>
        <p className="dashboard-subtext">Here's what's happening with your studies.</p>
      </div>
      <div className="dashboard-body">
        <div className="dashboard-left">
          <StatsBar stats={stats} />
          <DeadlineList tasks={tasks} />
        </div>
        <div className="dashboard-right">
          <CalendarView tasks={tasks} />
        </div>
      </div>
    </div>
  );
}