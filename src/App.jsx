import { useState, useEffect } from "react";
import "./styles/App.css";

import TodayBoard from './components/TodayBoard';
import ProccessBoard from './components/ProccessBoard';
import DoneBoard from './components/DoneBoard';

function App() {
  const [tasks, setTasks] = useState([]);
  const [dragged, setDragged] = useState(null);

  const [open, setOpen] = useState(false);
  const [openMore, setOpenMore] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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
        setSelectedTask={setSelectedTask}
        setOpenMore={setOpenMore}
      />

      <DoneBoard
        tasks={tasks}
        setTasks={setTasks}
        setDragged={setDragged}
        onDrop={() => handleDrop("done")}
        setSelectedTask={setSelectedTask}
        setOpenMore={setOpenMore}
      />
    </div>
  );
}

export default App;
