import { useState, useEffect } from "react";
import "./App.css";
import TaskColumn from "./components/task-collumn/TaskColumn";
import todoIcon from "../assets/direct-hit.png";
import doingIcon from "../assets/glowing-star.png";
import doneIcon from "../assets/check-mark-button.png";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskId) => {
    const newTasks = tasks.filter((task) => task?.id !== taskId);
    setTasks(newTasks);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h4>Tracko, a better daily todo</h4>
      </div>
      <main className="app-main">
        <TaskColumn
          title="New"
          icon={todoIcon}
          tasks={tasks}
          status="new"
          handleDelete={handleDelete}
          setTasks={setTasks}
        />
        <TaskColumn
          title="Ongoing"
          icon={doingIcon}
          tasks={tasks}
          status="ongoing"
          handleDelete={handleDelete}
          setTasks={setTasks}
        />
        <TaskColumn
          title="Done"
          icon={doneIcon}
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
          setTasks={setTasks}
        />
      </main>
    </div>
  );
};

export default App;
