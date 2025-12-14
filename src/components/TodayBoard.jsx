import "../styles/todayboard.css";
import ModalWindow from "./ModalWindow";
import Task from "./Task";
import { useState } from "react";

function TodayBoard({
  tasks,
  deleteTask,
  moveTask,
  setTasks,
  setDragged,
  onDrop,
  open,
  setOpen,
  selectedTask,
  setSelectedTask,
  openMore,
  setOpenMore
}) {
  const [taskText, setTaskText] = useState("");
  const [description, setDescription] = useState("");

  const isMobile = window.innerWidth < 768;

  const todayTasks = tasks.filter(t => t.status === "today");

  const addTask = () => {
    if (!taskText.trim()) return;

    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        text: taskText,
        desc: description,
        status: "today"
      }
    ]);

    setTaskText("");
    setDescription("");
    setOpen(false);
  };


  return (
    <>
      <div
        className="today-board"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <div className="text">
          <div className="info-today">
            <div className="today">
              <h2>Today tasks</h2>
              <div className="white-circle"></div>
            </div>
            <button className="today-btn" onClick={() => setOpen(true)}>
              Add
            </button>
          </div>
        </div>

        <div className="tasks">
          {todayTasks.map(task => (
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

      {open && (
        <ModalWindow onClose={() => setOpen(false)}>
          <h2>Add task</h2>

          <div className="task-info">
            <div className="input">
              <label>Task</label>
              <input
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
              />
            </div>

            <div className="input">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <button className="add-btn" onClick={addTask}>Add</button>
          </div>
        </ModalWindow>
      )}

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

          {isMobile && (
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
          )}
        </Task>
      )}
    </>
  );
}

export default TodayBoard;
