import { useState, useEffect } from "react";
import "./styles/App.css";

import TodayBoard from './components/TodayBoard';
import ProccessBoard from './components/ProccessBoard';
import DoneBoard from './components/DoneBoard';

import { useTouchDnD } from "./hooks/useTouchDnD";

function App() {
  const [tasks, setTasks] = useState([]);
  const [dragged, setDragged] = useState(null);

  const [open, setOpen] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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

  return (
    <div className="board-wrapper">
      <TodayBoard 
        tasks={tasks}
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
        setTasks={setTasks}
        setDragged={setDragged}
        onDrop={() => handleDrop("inprogress")}
        startDnD={start}
        setSelectedTask={setSelectedTask}
        setOpenMore={setOpenMore}
      />

      <DoneBoard
        tasks={tasks}
        setTasks={setTasks}
        setDragged={setDragged}
        onDrop={() => handleDrop("done")}
        startDnD={start}
        setSelectedTask={setSelectedTask}
        setOpenMore={setOpenMore}
      />
    </div>
  );
}

export default App;
