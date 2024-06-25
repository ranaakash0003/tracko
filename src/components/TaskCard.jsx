import React from "react";

import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";

const TaskCard = ({ taskDetails, tags, handleDelete, index }) => {
  return (
    <article className="task-card">
      <p className="task-text">{taskDetails?.task}</p>

      <div className="task-card-bottom-line">
        <div>
          {" "}
          <p className="task-details">{taskDetails?.description}</p>
          {taskDetails.dueDate && (
            <p className="task-date">
              Due: {new Date(taskDetails.dueDate).toLocaleString()}
            </p>
          )}
        </div>
        <div className="task-card-tags">
          {tags?.map((tag, index) => (
            <Tag key={index} tagName={tag} selected />
          ))}
        </div>
        <div className="task-delete" onClick={() => handleDelete(index)}>
          <img src={deleteIcon} className="delete-icon" alt="" />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
