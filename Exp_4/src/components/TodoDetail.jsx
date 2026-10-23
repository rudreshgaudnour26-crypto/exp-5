import React from 'react';
import '../css/TodoDetail.css';

export default function TodoDetail({ todo, onToggleComplete, onEditClick, onDeleteClick, onBack }) {
  if (!todo) return null;

  return (
    <div className="card-container">
      <button className="btn btn-secondary btn-sm" onClick={onBack}>&larr; Back to View All</button>
      
      <div className="detail-header">
        <input 
          type="checkbox" 
          checked={todo.completed} 
          onChange={() => onToggleComplete(todo.id)} 
          className="large-checkbox"
        />
        <h2 className={todo.completed ? 'completed-text' : ''}>{todo.title}</h2>
      </div>

      <div className="detail-meta">
        <p><strong>Category:</strong> {todo.category}</p>
        <p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Pending'}</p>
      </div>

      <div className="detail-body">
        <h4>Description:</h4>
        <p>{todo.description || 'No description provided.'}</p>
      </div>

      <div className="detail-actions">
        <button className="btn btn-warning" onClick={() => onEditClick(todo.id)}>Edit Task</button>
        <button className="btn btn-danger" onClick={() => onDeleteClick(todo.id)}>Delete Task</button>
      </div>
    </div>
  );
}