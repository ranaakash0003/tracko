import { useRef, useState, useEffect } from "react";
import "./TaskCard.css";
import deleteIcon from "../../../assets/delete.png";
import contextMenuIcon from "../../../assets/context-menu.png";

const TaskCard = ({ taskDetails, handleDelete, moveTask }) => {
  const [isMoveTask, setIsMoveTask] = useState(false);
  const focusRef = useRef(null);

  const handleClickOutside = (event) => {
    if (focusRef.current && !focusRef.current.contains(event.target)) {
      setIsMoveTask(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <article className="task-card">
      <div className="task-top">
        <p className="task-text">{taskDetails?.task}</p>
        <div className="task-menu" onClick={() => setIsMoveTask(true)}>
          <img src={contextMenuIcon} className="menu-icon" alt="" />
          {isMoveTask && (
            <ul className="menu-container" ref={focusRef}>
              {taskDetails.status !== "new" && (
                <li onClick={() => moveTask("new")}>New</li>
              )}
              {taskDetails.status !== "ongoing" && (
                <li onClick={() => moveTask("ongoing")}>Ongoing</li>
              )}
              {taskDetails.status !== "done" && (
                <li onClick={() => moveTask("done")}>Done</li>
              )}
            </ul>
          )}
        </div>
      </div>

      <div className="task-card-bottom-line">
        <div>
          <p className="task-details">{taskDetails?.description}</p>
          <span className={`status ${taskDetails.status.toLowerCase()}`}>
            {taskDetails.status}
          </span>
          {taskDetails.dueDate && (
            <p className="task-date">
              <span className="overdue">Due:</span>{" "}
              {new Date(taskDetails.dueDate).toLocaleString()}
            </p>
          )}
        </div>
        <div className="task-delete" onClick={() => handleDelete()}>
          <img src={deleteIcon} className="delete-icon" alt="" />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
