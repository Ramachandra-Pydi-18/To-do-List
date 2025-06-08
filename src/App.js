import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (editingId !== null) {
      setTasks(tasks.map(task =>
        task.id === editingId
          ? { ...task, text: inputValue.trim() }
          : task
      ));
      setEditingId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: inputValue.trim(),
      };
      setTasks([...tasks, newTask]);
    }
    setInputValue('');
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setInputValue(task.text);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container">
      <div className="todo-card">
        <h1>Get Things Done!</h1>
        
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What is the task today?"
            className="task-input"
          />
          <button type="submit" className="add-button">
            {editingId !== null ? 'Update Task' : 'Add Task'}
          </button>
        </form>

        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className="task-item">
              <span className="task-text">{task.text}</span>
              <div className="task-actions">
                <button 
                  className="edit-button"
                  onClick={() => startEditing(task)}
                >
                  <i className="edit-icon">✎</i>
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="delete-button"
                >
                  <i className="delete-icon">🗑</i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;