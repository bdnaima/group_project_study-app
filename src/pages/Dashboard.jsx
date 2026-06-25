import StatsBar from '../components/dashboard/Statsbar.jsx';
import DeadlineList from '../components/dashboard/DeadlineList';
import CalendarView from '../components/dashboard/CalendarView';
import './Dashboard.css';

const placeholderTasks = [
  { id: 1, title: "Chemistry lab report", subject: "Chemistry", dueDate: "2026-06-15", status: "in-progress" },
  { id: 2, title: "English essay", subject: "English", dueDate: "2026-06-20", status: "todo" },
  { id: 3, title: "Math page 7", subject: "Math", dueDate: "2026-06-22", status: "todo" },
];

export default function Dashboard() {
  const tasks = placeholderTasks;
  const stats = {
    total: tasks.length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    completed: tasks.filter(t => t.status === "done").length,
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Your Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back, Student!</p>
      </div>
      <StatsBar stats={stats} />
      <div className="dashboard-main">
        <DeadlineList tasks={tasks} />
        <CalendarView tasks={tasks} />
      </div>
    </div>
  );
}