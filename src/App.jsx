import { useState } from "react";
import "./styles/App.css";

import TodayBoard from './components/TodayBoard';
import ProccessBoard from './components/ProccessBoard';
import DoneBoard from './components/DoneBoard';

import { useTouchDnD } from "./customHooks/useTouchDnD";
import { useLocalStorage } from "./customHooks/useLocalStorage";
import { useTaskActions } from "./customHooks/useTasksActions";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [dragged, setDragged] = useState(null);

  const [open, setOpen] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { deleteTask, moveTask } = useTaskActions(setTasks);

  const { start } = useTouchDnD((task, newStatus) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id ? { ...t, status: newStatus } : t
      )
    );
  }); 

  const handleDrop = (status) => {
    if (!dragged) return;

    setTasks(prev =>
      prev.map(t =>
        t.id === dragged ? { ...t, status } : t
      )
    );

    setDragged(null);
  };

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <div className="board-wrapper">
      <div className="date">
          <p>{day}.{month}.{year}</p>
      </div>

      <TodayBoard 
        tasks={tasks}
        deleteTask={deleteTask}
        moveTask={moveTask}
        setTasks={setTasks}
        setDragged={setDragged}
        onDrop={() => handleDrop("today")}
        startDnD={start}
        open={open}
        setOpen={setOpen}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        openMore={openMore}
        setOpenMore={setOpenMore}
      />

      <ProccessBoard
        tasks={tasks}
        deleteTask={deleteTask}
        moveTask={moveTask}
        setTasks={setTasks}
        setDragged={setDragged}
        onDrop={() => handleDrop("inprogress")}
        startDnD={start}
        setSelectedTask={setSelectedTask}
        setOpenMore={setOpenMore}
      />

      <DoneBoard
        tasks={tasks}
        deleteTask={deleteTask}
        moveTask={moveTask}
        setTasks={setTasks}
        setDragged={setDragged}
        onDrop={() => handleDrop("done")}
        startDnD={start}
        setSelectedTask={setSelectedTask}
        setOpenMore={setOpenMore}
      />


      <div className="text-clues">
        <div className="title">
          <h1>Clues:</h1>
        </div>
        <h2>Double-tap a task to delete it</h2>
        <h2>To move a task, tap on "..."</h2>
        <h2>To delete all today’s tasks, tap "Clear" in Done</h2>
      </div>
    </div>
  );
}

export default App;
