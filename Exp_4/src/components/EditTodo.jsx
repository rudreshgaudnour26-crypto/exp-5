import React, { useState } from 'react';
import '../css/EditTodo.css';

export default function EditTodo({ todo, onSaveEdit, onCancel }) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [category, setCategory] = useState(todo.category);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSaveEdit(todo.id, { title, description, category });
  };

  return (
    <div className="card-container">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <label>Task Title *</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="College">College</option>
        </select>

        <label>Description</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          rows="4"
        />

        <div className="edit-actions">
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}