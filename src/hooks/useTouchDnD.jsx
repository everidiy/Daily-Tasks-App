import { useRef } from "react";

export function useTouchDnD(onDrop) {
  const dragItem = useRef(null);
  const ghost = useRef(null);

  const start = (e, task) => {
    const point = getPoint(e);

    dragItem.current = {
      task,
      offsetX: point.x - e.target.getBoundingClientRect().left,
      offsetY: point.y - e.target.getBoundingClientRect().top
    };

    // создаём призрак
    ghost.current = e.target.cloneNode(true);
    ghost.current.style.position = "fixed";
    ghost.current.style.left = point.x - dragItem.current.offsetX + "px";
    ghost.current.style.top = point.y - dragItem.current.offsetY + "px";
    ghost.current.style.opacity = "0.8";
    ghost.current.style.zIndex = "9999";
    ghost.current.style.pointerEvents = "none";

    document.body.appendChild(ghost.current);

    bindEvents();
  };

  const move = (e) => {
    if (!ghost.current) return;

    const point = getPoint(e);
    ghost.current.style.left = point.x - dragItem.current.offsetX + "px";
    ghost.current.style.top = point.y - dragItem.current.offsetY + "px";
  };

  const end = (e) => {
    if (!ghost.current) return;

    const point = getPoint(e);
    const targetColumn = document.elementFromPoint(point.x, point.y)?.dataset?.column;

    if (targetColumn)
      onDrop(dragItem.current.task, targetColumn);

    ghost.current.remove();
    ghost.current = null;
    dragItem.current = null;

    unbindEvents();
  };

  const bindEvents = () => {
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", end);
    document.addEventListener("touchmove", move);
    document.addEventListener("touchend", end);
  };

  const unbindEvents = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", end);
    document.removeEventListener("touchmove", move);
    document.removeEventListener("touchend", end);
  };

  return { start };
}

function getPoint(e) {
  if (e.touches) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  return { x: e.clientX, y: e.clientY };
}
