import "../styles/proccessboard.css";

function ProccessBoard({ tasks, setTasks, startDnD, onDrop, setSelectedTask, setOpenMore }) {
  const processTasks = tasks.filter(t => t.status === "inprogress");

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div
      className="proccess-board"
      data-column="inprogress"
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
            onMouseDown={(e) => startDnD(e, task)}
            onTouchStart={(e) => startDnD(e, task)}
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

export default ProccessBoard;
