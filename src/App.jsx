import { useState } from "react";

import TaskList from "./components/TaskList.jsx";

import TaskForm from "./components/TaskForm.jsx";

import "./App.css";

 

// Session 13: the books are typed in here, in the browser.

// Session 14 replaces this array with GET /api/books.

const STARTING_TASKS = [

  { id: 1, title: "Revaleda", available: true },

  { id: 2, title: "Hands On GT", available: true },

  { id: 3, title: "Finals", available: true },

  { id: 4, title: "Metre", available: false },

];

function App() {

  const [tasks, setTasks] = useState(STARTING_TASKS);


  function addTask(title) {

    const newTask = {

      id: Date.now(),

      title: title,

      available: true,

    };

    setTasks([...tasks, newTask]);

  }

  return (

    <main className="library">

      <h1>Library</h1>

      <p className="count">

        {tasks.length} tasks in the catalogue

      </p>

      <TaskForm onAdd={addTask} />

      <TaskList tasks={tasks} />

    </main>

  );

}

 

export default App;