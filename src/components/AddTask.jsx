import React, { useState } from "react";
import "./TaskForm.css";

const AddTask = ({ onAddTaskSuccess, onClose }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    description: "",
    dueDate: "",
    status: "todo",
    tags: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskData);
    onAddTaskSuccess((prev) => {
      return [...prev, taskData];
    });
    setTaskData({
      task: "",
      description: "",
      dueDate: "",
      status: "todo",
      tags: [],
    });
  };

  console.log("ffffffffffffffffffff");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="task-popup">
      <input
        type="text"
        name="task"
        value={taskData.task}
        className="task-input"
        placeholder="Title"
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={taskData.description}
        className="task-input"
        placeholder="Description"
        onChange={handleChange}
      />
      <input
        type="datetime-local"
        name="dueDate"
        value={taskData.dueDate}
        onChange={handleChange}
      />

      <div className="task-actions">
        <button className="task-close" onClick={onClose}>
          CLose
        </button>
        <button
          className="task-add"
          onClick={handleSubmit}
          disabled={!taskData?.task && !taskData?.dueDate}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTask;
