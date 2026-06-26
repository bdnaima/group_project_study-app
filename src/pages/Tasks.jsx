import { useState, useEffect } from 'react';

function Tasks() {
    // Load existing tasks from local storage on mount
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('my_study_tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    // Form inputs and toggle states
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('General');
    const [newDueDate, setNewDueDate] = useState('');

    // Filter and sort criteria states
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [sortBy, setSortBy] = useState('None');

    // Sync state changes with localStorage
    useEffect(() => {
        localStorage.setItem('my_study_tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Formats calendar string (YYYY-MM-DD) into user-friendly display (DD/MM/YY)
    const formatDateToDisplay = (dateString) => {
        if (!dateString) return 'No due date';
        const parts = dateString.split('-');
        if (parts.length !== 3) return dateString;
        const yearShort = parts[0].slice(-2);
        return `${parts[2]}/${parts[1]}/${yearShort}`;
    };

    // Submits form data for either a new task or a task update
    const handleSaveTask = (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        if (isEditing) {
            setTasks(tasks.map(task =>
                task.id === isEditing
                    ? { ...task, title: newTitle, category: newCategory, dueDate: newDueDate, categoryColor: getCategoryColor(newCategory) }
                    : task
            ));
            setIsEditing(null);
        } else {
            // Safely call the isolated utility function from below
            const uniqueId = generateSafeId();

            const newTask = {
                id: uniqueId,
                title: newTitle,
                category: newCategory,
                categoryColor: getCategoryColor(newCategory),
                dueDate: newDueDate,
                status: 'Todo',
                completed: false
            };
            setTasks([...tasks, newTask]);
        }

        setNewTitle('');
        setNewDueDate('');
        setShowForm(false);
    };

    const getCategoryColor = (cat) => {
        if (cat === 'Chemistry') return '#ff4d4d';
        if (cat === 'Programming') return '#4dabf7';
        return '#888888';
    };

    const handleToggleComplete = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed, status: !task.completed ? 'Done' : 'Todo' } : task
        ));
    };

    const handleStartEdit = (task) => {
        setIsEditing(task.id);
        setNewTitle(task.title);
        setNewCategory(task.category);
        setNewDueDate(task.dueDate);
        setShowForm(true);
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const uniqueCategories = ['All', ...new Set(tasks.map(task => task.category))];

    // Filter tasks based on current search, status, and category selectors
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'All' ? true :
            statusFilter === 'Completed' ? task.completed : !task.completed;

        const matchesCategory = categoryFilter === 'All' ? true : task.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    // Sort the filtered results dynamically
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortBy === 'Name') {
            return a.title.localeCompare(b.title);
        }
        if (sortBy === 'DueDate') {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return a.dueDate.localeCompare(b.dueDate);
        }
        return 0;
    });

    return (
        <div style={styles.container}>
            <h1 style={styles.pageTitle}>Tasks</h1>

            {/* Search Bar */}
            <div style={styles.searchContainer}>
                <span style={styles.searchIcon}>🔍</span>
                <input
                    type="text"
                    placeholder="Search tasks or categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            {/* Active Filters Row */}
            <div style={styles.filtersRow}>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.dropdown}>
                    <option value="All">All status</option>
                    <option value="Active">Active (Todo)</option>
                    <option value="Completed">Completed (Done)</option>
                </select>

                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={styles.dropdown}>
                    {uniqueCategories.map(cat => (
                        <option key={cat} value={cat}>{cat === 'All' ? 'All categories' : cat}</option>
                    ))}
                </select>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.dropdown}>
                    <option value="None">Sort</option>
                    <option value="Name">Name (A-Z)</option>
                    <option value="DueDate">Due Date</option>
                </select>
            </div>

            {/* Dynamic Tasks List */}
            <div style={styles.taskList}>
                {sortedTasks.length === 0 ? (
                    <div style={styles.emptyState}>
                        📭 No matching tasks found.
                    </div>
                ) : (
                    sortedTasks.map((task) => (
                        <div key={task.id} style={{
                            ...styles.taskCard,
                            opacity: task.completed ? 0.6 : 1,
                            backgroundColor: task.completed ? '#f9f9f9' : '#fff'
                        }}>
                            <div style={styles.leftSection}>
                                <div
                                    style={{
                                        ...styles.checkboxCircle,
                                        backgroundColor: task.completed ? '#000' : '#fff'
                                    }}
                                    onClick={() => handleToggleComplete(task.id)}
                                >
                                    {task.completed && <span style={styles.checkMark}>✓</span>}
                                </div>

                                <div style={styles.taskDetails}>
                                    <h3 style={{
                                        ...styles.taskTitle,
                                        textDecoration: task.completed ? 'line-through' : 'none'
                                    }}>
                                        {task.title}
                                    </h3>
                                    <div style={styles.categoryRow}>
                                        <span style={{ ...styles.colorDot, backgroundColor: task.categoryColor }}></span>
                                        <span style={styles.categoryText}>{task.category}</span>
                                    </div>
                                    <p style={styles.dueDate}>Due: {formatDateToDisplay(task.dueDate)}</p>
                                </div>
                            </div>

                            <div style={styles.rightSection}>
                                <span style={styles.statusPill}>{task.status}</span>
                                <div style={styles.actionButtons}>
                                    <button style={styles.iconButton} onClick={() => handleStartEdit(task)} title="Edit">✏️</button>
                                    <button style={styles.iconButton} onClick={() => handleDeleteTask(task.id)} title="Delete permanently">🗑️</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add/Edit Task Form Box */}
            {showForm && (
                <form onSubmit={handleSaveTask} style={styles.formCard}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#000' }}>
                        {isEditing ? '✏️ Edit Task' : '✨ Add New Task'}
                    </h3>
                    <input
                        type="text"
                        placeholder="Task Title..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        style={styles.formInput}
                        required
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            style={styles.formInput}
                        >
                            <option value="General">General</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Programming">Programming</option>
                        </select>

                        <input
                            type="date"
                            value={newDueDate}
                            onChange={(e) => setNewDueDate(e.target.value)}
                            style={styles.formInput}
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                        <button type="submit" style={styles.formSaveBtn}>
                            {isEditing ? 'Update' : 'Save Task'}
                        </button>
                        <button type="button" onClick={() => { setShowForm(false); setIsEditing(null); }} style={styles.formCancelBtn}>Cancel</button>
                    </div>
                </form>
            )}

            {/* Main Trigger Button */}
            {!showForm && (
                <button style={styles.addButton} onClick={() => setShowForm(true)}>
                    + Add new task
                </button>
            )}
        </div>
    );
}

const styles = {
    container: { maxWidth: '500px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#fff' },
    pageTitle: { textAlign: 'center', fontSize: '26px', marginBottom: '20px', color: '#000', fontWeight: 'bold' },
    searchContainer: { display: 'flex', alignItems: 'center', border: '2px solid #000', borderRadius: '12px', padding: '8px 12px', marginBottom: '15px', backgroundColor: '#fff' },
    searchIcon: { marginRight: '8px', color: '#000' },
    searchInput: { border: 'none', outline: 'none', width: '100%', fontSize: '16px', backgroundColor: '#fff', color: '#000' },
    filtersRow: { display: 'flex', gap: '10px', marginBottom: '20px' },
    dropdown: { flex: 1, padding: '10px', border: '2px solid #000', borderRadius: '12px', backgroundColor: '#fff', fontSize: '14px', color: '#000', cursor: 'pointer' },
    taskList: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' },
    taskCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '2px solid #000', borderRadius: '18px', padding: '15px', transition: 'all 0.2s ease' },
    leftSection: { display: 'flex', alignItems: 'flex-start', gap: '15px' },
    checkboxCircle: { width: '24px', height: '24px', border: '2px solid #000', borderRadius: '50%', marginTop: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    checkMark: { color: '#fff', fontSize: '14px', fontWeight: 'bold' },
    taskDetails: { display: 'flex', flexDirection: 'column', gap: '4px' },
    taskTitle: { margin: 0, fontSize: '18px', fontWeight: '700', color: '#111' },
    categoryRow: { display: 'flex', alignItems: 'center', gap: '6px' },
    colorDot: { width: '8px', height: '8px', borderRadius: '50%' },
    categoryText: { fontSize: '13px', color: '#333', fontWeight: '500' },
    dueDate: { margin: '4px 0 0 0', fontSize: '12px', fontWeight: 'bold', color: '#555' },
    rightSection: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '65px' },
    statusPill: { fontSize: '11px', border: '1px solid #000', borderRadius: '12px', padding: '3px 10px', fontWeight: '600', color: '#000' },
    actionButtons: { display: 'flex', gap: '8px' },
    iconButton: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: 0 },
    addButton: { width: '100%', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '12px', padding: '15px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
    emptyState: { textAlign: 'center', padding: '30px', border: '2px dashed #ccc', borderRadius: '18px', color: '#666', fontSize: '15px' },
    formCard: { border: '2px solid #000', borderRadius: '18px', padding: '15px', marginBottom: '15px', backgroundColor: '#fff' },
    formInput: { width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #000', borderRadius: '8px', boxSizing: 'border-box', backgroundColor: '#fff', color: '#000' },
    formSaveBtn: { flex: 1, backgroundColor: '#000', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
    formCancelBtn: { backgroundColor: '#fff', color: '#000', border: '1px solid #000', padding: '10px', borderRadius: '8px', cursor: 'pointer' }
};

// Isolated pure utility helper for safe string IDs
function generateSafeId() {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 11)
    );
}

export default Tasks;