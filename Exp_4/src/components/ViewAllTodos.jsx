import React from 'react';
import '../css/ViewAllTodos.css';

export default function ViewAllTodos({ todos, onViewDetail, onEditClick, onDeleteClick, onToggleComplete }) {
  if (todos.length === 0) {
    return (
      <div className="card-container empty-state">
        <h3>No Tasks Found</h3>
        <p>Use the "Create Task" tab in the navigation bar to add your first item.</p>
      </div>
    );
  }

  // 1. SORT TASKS: Uncompleted (false = 0) come first, completed (true = 1) move to the bottom
  const sortedTodos = [...todos].sort((a, b) => Number(a.completed) - Number(b.completed));

  return (
    <div className="card-container">
      <h2>All Tasks</h2>
      <ul className="todo-list">
        {/* 2. MAP OVER THE SORTED ARRAY */}
        {sortedTodos.map((todo) => (
          <li key={todo.id} className={`todo-item-row ${todo.completed ? 'is-completed' : ''}`}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => onToggleComplete(todo.id)} 
            />
            
            <span className="todo-title-link" onClick={() => onViewDetail(todo.id)}>
              {todo.title}
              <small className="category-tag">{todo.category}</small>
            </span>

            <div className="row-actions">
              <button className="btn btn-sm btn-warning" onClick={() => onEditClick(todo.id)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => onDeleteClick(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}