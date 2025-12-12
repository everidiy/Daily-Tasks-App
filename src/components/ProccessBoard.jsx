import "../styles/proccessboard.css";
import Task from "./Task";

function ProccessBoard({ 
  tasks,
  setTasks,
  setDragged,
  onDrop,
  openMore,
  setOpenMore,
  selectedTask,
  setSelectedTask
}) {
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

    setOpenMore(false);
  };

  return (
    <>
      <div
        className="proccess-board"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <div className="text">
          <div className="info-proccess">
            <h2>In progress</h2>
            <div className="yellow-circle"></div>
          </div>
        </div>

        <div className="items">
          {processTasks.map(task => (
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

              <button onClick={() => { setSelectedTask(task); setOpenMore(true); }}>
                ...
              </button>
            </div>
          ))}
        </div>
      </div>

      {openMore && selectedTask && (
        <Task onClose={() => setOpenMore(false)}>
          <h2>Your task</h2>

          <div className="field">
            <label>Text</label>
            <div className="field-box">{selectedTask.text}</div>
          </div>

          <div className="field">
            <label>Description</label>
            <div className="field-box big">
              {selectedTask.desc || "No description"}
            </div>
          </div>

          <div className="btns">
            <button onClick={() => moveTask(selectedTask.id, "today")}>
              to Today
            </button>

            <button onClick={() => moveTask(selectedTask.id, "inprogress")}>
              to Process
            </button>

            <button onClick={() => moveTask(selectedTask.id, "done")}>
              to Done
            </button>
          </div>
        </Task>
      )}
    </>
  );
}

export default ProccessBoard;
