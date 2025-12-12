import "../styles/doneboard.css";
import Task from "./Task";
import { useState } from "react";

function DoneBoard({
  tasks,
  setTasks,
  startDnD,
  setSelectedTask,
  setOpenMore
}) {
  const [lastTap, setLastTap] = useState(0);
  const doneTasks = tasks.filter(t => t.status === "done");

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
      <div className="done-board" data-column="done">
        <h2>Done</h2>

        <div className="tasks">
          {doneTasks.map(task => (
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

export default DoneBoard;
