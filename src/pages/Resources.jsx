import { useState } from 'react';
import './Resources.css';

const CATEGORIES = ['Repository', 'Article', 'Video', 'Other'];

const categoryIcon = {
    'Repository': '📁',
    'Article': '📄',
    'Video': '🎬',
    'Other': '🔗',
};

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 11);
}

export default function Resources() {
    const [resources, setResources] = useState(() => {
        return JSON.parse(localStorage.getItem('my_study_resources') || '[]');
    });

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('Repository');
    const [description, setDescription] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState('');

    function showNotice(message) {
        setNotification(message);
        setTimeout(() => setNotification(''), 3000);
    }

    function saveToStorage(updated) {
        localStorage.setItem('my_study_resources', JSON.stringify(updated));
        setResources(updated);
    }

    function handleSave(e) {
        e.preventDefault();
        if (!title.trim() || !url.trim()) return;

        const entry = { id: isEditing || generateId(), title, url, category, description };
        const updated = isEditing
            ? resources.map(r => r.id === isEditing ? entry : r)
            : [...resources, entry];

        saveToStorage(updated);
        showNotice(isEditing ? '✨ Resource updated successfully!' : '✅ Resource added successfully!');
        resetForm();
    }

    function handleEdit(resource) {
        setIsEditing(resource.id);
        setTitle(resource.title);
        setUrl(resource.url);
        setCategory(resource.category);
        setDescription(resource.description || '');
        setShowForm(true);
    }

    function handleDelete(id) {
        saveToStorage(resources.filter(r => r.id !== id));
        showNotice('🗑️ Resource deleted successfully!');
    }

    function resetForm() {
        setIsEditing(null);
        setTitle('');
        setUrl('');
        setCategory('Repository');
        setDescription('');
        setShowForm(false);
    }

    const filtered = resources.filter(r => {
        const matchesCategory = categoryFilter === 'All' || r.category === categoryFilter;
        const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="resources-container">
            {notification && (
                <div className="resources-notification">
                    {notification}
                </div>
            )}
            <div className="resources-container">
                <h1 className="resources-title">Resources</h1>

                <div className="resources-search-container">
                    <span className="resources-search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="resources-search-input"
                    />
                </div>

                <div className="resources-filters">
                    {['All', ...CATEGORIES].map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${categoryFilter === cat ? 'active' : ''}`}
                            onClick={() => setCategoryFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="resources-list">
                    {filtered.length === 0 ? (
                        <div className="resources-empty">🔍 No resources found.</div>
                    ) : (
                        filtered.map(resource => (
                            <div key={resource.id} className="resource-item">
                                <div className="resource-left">
                                    <span className="resource-icon">{categoryIcon[resource.category]}</span>
                                    <div className="resource-info">
                                        <a
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="resource-title"
                                        >
                                            {resource.title}
                                        </a>
                                        {resource.description && (
                                            <span className="resource-description">{resource.description}</span>
                                        )}
                                        <span className="resource-url">{resource.url}</span>
                                    </div>
                                </div>
                                <div className="resource-right">
                                    <span className="resource-category">{resource.category}</span>
                                    <div className="resource-actions">
                                        <button onClick={() => handleEdit(resource)} title="Edit">✏️</button>
                                        <button onClick={() => handleDelete(resource.id)} title="Delete">🗑️</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {showForm && (
                <form onSubmit={handleSave} className="resource-form">
                    <h3>{isEditing ? '✏️ Edit Resource' : '✨ Add Resource'}</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="resource-form-input"
                        required
                    />
                    <input
                        type="url"
                        placeholder="URL (https://...)"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        className="resource-form-input"
                        required
                    />
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="resource-form-input"
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <textarea
                        placeholder="Description (optional)"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="resource-form-input resource-form-textarea"
                    />
                    <div className="resource-form-actions">
                        <button type="submit" className="resource-save-btn">
                            {isEditing ? 'Update' : 'Save'}
                        </button>
                        <button type="button" onClick={resetForm} className="resource-cancel-btn">
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {!showForm && (
                <button className="resource-add-btn" onClick={() => setShowForm(true)}>
                    + Add resource
                </button>
            )}
        </div>
    );
}