import { useState, useEffect, useRef } from "react";
import Todo from "../assets/direct-hit.png";

import "./TaskColumn.css";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

const TaskColumn = ({ title, icon, tasks, status, handleDelete, setTasks }) => {
  const [isAdddTask, setIsAddTask] = useState(false);
  const focusRef = useRef(null);

  // const handleClickOutside = (event) => {
  //   if (focusRef.current && !focusRef.current.contains(event.target)) {
  //     setIsAddTask(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside, true);
  //   };
  // }, []);

  return (
    <section className="task-column">
      <h2 className="task-column-heading">
        <img className="task-column-icon" src={icon} alt="" /> {title}
        {title === "New" && (
          <button className="task-submit" onClick={() => setIsAddTask(true)}>
            + Add Task
          </button>
        )}
      </h2>

      {isAdddTask && (
        <div ref={focusRef}>
          <AddTask
            onAddTaskSuccess={(value) => {
              setTasks(value);
              setIsAddTask(false);
            }}
            onClose={() => setIsAddTask(false)}
          />
        </div>
      )}

      {tasks.map(
        (task, index) =>
          task.status === status && (
            <TaskCard
              key={index}
              taskDetails={task}
              handleDelete={handleDelete}
              index={index}
            />
          )
      )}
    </section>
  );
};

export default TaskColumn;
