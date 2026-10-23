import React, { useState } from 'react';
import '../css/CreateTodo.css';

function CreateTodo({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Personal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({ title, description, category });
  };

  return (
    <div className="card-container">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit} className="create-form">
        <label>Task Title *</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="e.g. Finish React Assignment"
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
          placeholder="Add extra details..."
          rows="4"
        />

        <button type="submit" className="btn btn-primary">Create Task</button>
      </form>
    </div>
  );
}

export default CreateTodo;