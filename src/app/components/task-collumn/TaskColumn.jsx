import { useState } from "react";
import "./TaskColumn.css";
import TaskCard from "../task-card/TaskCard";
import AddTask from "../add-task/AddTask";

const TaskColumn = ({ title, icon, tasks, status, handleDelete, setTasks }) => {
  const [isAdddTask, setIsAddTask] = useState(false);
  const [isOntime, setIsOntime] = useState(false);
  const [isOverdue, setIsOverdue] = useState(false);

  const moveTask = (slectedTask, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === slectedTask.id ? { ...task, status: newStatus } : task
      )
    );

    const currentDateTime = new Date();
    const dueDateTime = new Date(slectedTask.dueDate);

    if (newStatus === "done") {
      if (dueDateTime < currentDateTime) {
        setIsOverdue(true);
        setTimeout(() => {
          setIsOverdue(false);
        }, 3000);
      }
      if (dueDateTime >= currentDateTime) {
        setIsOntime(true);
        setTimeout(() => {
          setIsOntime(false);
        }, 3000);
      }
    }
  };
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
        <div>
          <AddTask
            id={tasks?.length}
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
              handleDelete={() => handleDelete(task.id)}
              moveTask={(status) => moveTask(task, status)}
            />
          )
      )}
      {isOntime && (
        <div className="ontime-task">
          <span>Congratulations! Ontime 🎉</span>
        </div>
      )}
      {isOverdue && (
        <div className="overdue-task">
          <span>Ohh! Overdue ☹️</span>
        </div>
      )}
    </section>
  );
};

export default TaskColumn;
