import { useState, useEffect } from 'react';
import '../styles/modal.css';

function ModalWindow({ children, onClose }) {
    const [isClose, setIsClose] = useState(false);

    const closeModal = () => {
        setIsClose(true);
        setTimeout(() => {
            onClose();
        }, 250)
    }

    useEffect(() => {
            document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <>
            <div className={`modal-overlay ${isClose ? "closing" : ""}`} onClick={closeModal}></div>

            <div className={`modal ${isClose ? "closing" : ""}`}>
                <button className="modal-close" onClick={closeModal}>×</button>

                <div className="modal-content">
                    {children}
                </div>
            </div>
        </>
    );
}

export default ModalWindow;
