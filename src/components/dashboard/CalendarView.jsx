import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import "./CalendarView.css";

const statusLabel = {
  "in-progress": "In progress",
  "done": "Done",
};

export default function CalendarView({ tasks }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const tasksByDate = {};
  tasks.forEach(task => {
    tasksByDate[task.dueDate] = tasksByDate[task.dueDate] || [];
    tasksByDate[task.dueDate].push(task);
  });

  function toLocalKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function tileContent({ date }) {
    const key = toLocalKey(date);
    return tasksByDate[key] ? <span className="dot" /> : null;
  }

  const selectedKey = toLocalKey(selectedDate);
  const selectedTasks = tasksByDate[selectedKey] || [];

  return (
    <div className="calendar-wrapper">
      <h2>Calendar</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={tileContent}
      />
      <ul className="selected-tasks">
        {selectedTasks.map(task => (
          <li key={task.id}>
            <span className="task-title">{task.title}</span>
            <span className={`task-status status-${task.status}`}>
              {statusLabel[task.status]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}