import "../styles/proccessboard.css";
import Task from "./Task";
import { useState } from "react";

function ProccessBoard({
  tasks,
  setTasks,
  startDnD,
  setSelectedTask,
  setOpenMore
}) {
  const [lastTap, setLastTap] = useState(0);
  const processTasks = tasks.filter(t => t.status === "inprogress");

  const deleteTask = (id) => {
    const now = Date.now();
    if (now - lastTap < 300) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
    setLastTap(now);
  };

  const moveTask = (id, newStatus) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: newStatus } : t
      )
    );
  };

  return (
    <>
      <div className="proccess-board" data-column="inprogress">
        <h2>In progress</h2>

        <div className="tasks">
          {processTasks.map(task => (
            <div
              key={task.id}
              className="task-item"
              onMouseDown={(e) => startDnD(e, task)}
              onTouchStart={(e) => startDnD(e, task)}
              onClick={() => deleteTask(task.id)}
            >
              <div className="text">
                <p>{task.text}</p>
              </div>

              <button
                onClick={() => {
                  setSelectedTask(task);
                  setOpenMore(true);
                }}
              >
                ...
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProccessBoard;
