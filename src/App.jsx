import React, { useState, useEffect } from "react";

import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      <main className="app-main">
        <TaskColumn
          title="New"
          icon={todoIcon}
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
          setTasks={setTasks}
        />
        <TaskColumn
          title="Ongoing"
          icon={doingIcon}
          tasks={tasks}
          status="doing"
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
