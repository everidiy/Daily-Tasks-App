import { useState } from 'react';
import '../styles/task.css';

function Task({ children, onClose, key }) {
    const [isClose, setIsClose] = useState(false);
    
    const closeTask = () => {
        setIsClose(true);
        setTimeout(() => {
            onClose();
        }, 250)
    }
    
    return (
        <>
            <div className={`task-overlay ${isClose ? "closing" : ""}`} onClick={closeTask}></div>

            <div key={key} className={`task ${isClose ? "closing" : ""}`}>
                <button className="task-close" onClick={closeTask}>×</button>

                <div className="task-content">
                    {children}
                </div>
            </div>
        </>
    );
}

export default Task;