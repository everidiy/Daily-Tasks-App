import { useState } from "react";
import "../styles/doneboard.css";

function DoneBoard({ tasks, setTasks, setDragged, onDrop, setSelectedTask, setOpenMore }) {
  const doneTasks = tasks.filter(t => t.status === "done");

  const [lastTap, setLastTap] = useState(0);

  const deleteTask = (id) => {
    const now = Date.now();

    if (now - lastTap < 300) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
    
    setLastTap(now);
  };

  const clearDone = () => {
    setTasks(prev => prev.filter(t => t.status !== "done"));
  };

  return (
    <div
      className="done-board"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="text">
        <div className="info-done">
          <h2>In progress</h2>
          <div className="green-circle"></div>

          <button className="done-btn" onClick={clearDone}>Clear</button>
        </div>
      </div>

      <div className="items">
        {doneTasks.map(task => (
          <div
            key={task.id}
            className="task-item"
            draggable
            onDragStart={() => setDragged(task.id)}
            onClick={() => deleteTask(task.id)}
          >
            <div className="text">
              <p>{task.text}</p>
            </div>

            <button onClick={() => { setSelectedTask(task); setOpenMore(true); }}>...</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneBoard;