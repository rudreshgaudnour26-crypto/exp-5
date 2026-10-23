import React from 'react';
import '../css/Footer.css';

export default function Footer({ totalTasks, completedTasks }) {
  const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <footer className="footer">
      <p>Progress: {percentage}% completed ({completedTasks} of {totalTasks} tasks)</p>
      <p>&copy; {new Date().getFullYear()} Task Management Application</p>
    </footer>
  );
}