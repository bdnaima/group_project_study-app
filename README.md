# Study Planner

A web-based study planner application built with React and Vite. Users can register, log in, manage tasks, and view their workload on a dashboard with an overview calendar.

## Features

- **Authentication** — Register and log in with email and password, stored in localStorage
- **Task management** — Add, edit, delete, and complete tasks with categories and due dates
- **Dashboard** — Overview of total, in-progress, and completed tasks at a glance
- **Deadline list** — Upcoming tasks sorted by due date
- **Calendar** — Monthly calendar view with deadline indicators

## Tech Stack

- [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- React Router for client-side navigation
- [react-calendar](https://www.npmjs.com/package/react-calendar) for the calendar component
- localStorage for data persistence (no backend)
- Plain CSS for styling

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm 

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bdnaima/group_project_study-app.git
   cd group_project_study-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173`

## Usage

1. Register a new account on the sign-up page
2. Log in with your credentials
3. Add tasks from the Tasks page — set a title, category, and due date
4. View your dashboard for a summary of your tasks and upcoming deadlines

## Project Structure

```
src/
├── pages/
│   ├── Login.jsx           # Login page
│   ├── Register.jsx        # Register page
│   ├── Dashboard.jsx       # Main dashboard page
│   └── Tasks.jsx           # Task management page
├── components/
│   ├── Navbar.jsx          # Navigation bar
│   └── dashboard/
│       ├── StatsBar.jsx    # Task count summary cards
│       ├── DeadlineList.jsx # Upcoming deadlines list
│       └── CalendarView.jsx # Monthly calendar with deadline dots
└── App.jsx
```

## Group Members

| Name      | Main Area              |
|-----------|------------------------|
|Naima      | Login / Registration   |
|Christian  | Tasks page / Navbar    |
|Erik       | Dashboard              |
