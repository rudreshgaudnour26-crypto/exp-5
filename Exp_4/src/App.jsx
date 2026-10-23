import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreateTodo from './components/CreateTodo';
import ViewAllTodos from './components/ViewAllTodos';
import TodoDetail from './components/TodoDetail';
import EditTodo from './components/EditTodo';
import './App.css';

export default function App() {
  // 1. INITIAL STATE: Read from localStorage when the app boots up
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos); // Parse JSON string back into an array
    }
    return [
      { id: 1, title: 'Complete React Assignment', category: 'College', description: 'Build To-Do App with state & props', completed: false },
      { id: 2, title: 'Buy Grocery Items', category: 'Personal', description: 'Milk, Eggs, Bread', completed: true }
    ];
  });

  const [activeView, setActiveView] = useState('viewAll');
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  // 2. USEEFFECT: Automatically save to localStorage whenever 'todos' array changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // Dependency array: triggers every time 'todos' updates

  // Counter metrics
  const completedCount = todos.filter((t) => t.completed).length;
  const todoCount = todos.filter((t) => !t.completed).length;

  // Handlers
  const handleAddTask = (newTaskData) => {
    const newTodo = {
      id: Date.now(),
      ...newTaskData,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setActiveView('viewAll');
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const handleDeleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (activeView === 'detail' || activeView === 'edit') {
      setActiveView('viewAll');
    }
  };

  const handleSaveEdit = (id, updatedData) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo))
    );
    setActiveView('viewAll');
  };

  const selectedTodo = todos.find((t) => t.id === selectedTodoId);

  return (
    <div className="app-layout">
      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        todoCount={todoCount} 
        completedCount={completedCount} 
      />

      <main className="content">
        {activeView === 'create' && (
          <CreateTodo onAddTask={handleAddTask} />
        )}

        {activeView === 'viewAll' && (
          <ViewAllTodos 
            todos={todos} 
            onViewDetail={(id) => { setSelectedTodoId(id); setActiveView('detail'); }} 
            onEditClick={(id) => { setSelectedTodoId(id); setActiveView('edit'); }} 
            onDeleteClick={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        )}

        {activeView === 'detail' && selectedTodo && (
          <TodoDetail 
            todo={selectedTodo} 
            onToggleComplete={handleToggleComplete} 
            onEditClick={(id) => { setSelectedTodoId(id); setActiveView('edit'); }} 
            onDeleteClick={handleDeleteTask} 
            onBack={() => setActiveView('viewAll')}
          />
        )}

        {activeView === 'edit' && selectedTodo && (
          <EditTodo 
            todo={selectedTodo} 
            onSaveEdit={handleSaveEdit} 
            onCancel={() => setActiveView('viewAll')} 
          />
        )}
      </main>

      <Footer totalTasks={todos.length} completedTasks={completedCount} />
    </div>
  );
}