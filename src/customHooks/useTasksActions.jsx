import { useRef } from "react";

export function useTaskActions(setTasks) {
  const lastTap = useRef(0);

  const deleteTask = (id) => {
    const now = Date.now();

    if (now - lastTap.current < 300) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }

    lastTap.current = now;
  };

  const moveTask = (id, newStatus) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: newStatus } : t
      )
    );
  };

  return { deleteTask, moveTask };
}
