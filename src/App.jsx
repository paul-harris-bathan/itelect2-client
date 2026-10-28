import { useEffect, useState } from "react";

import TaskList from "./components/TaskList.jsx";

import TaskForm from "./components/TaskForm.jsx";

import LoginForm from "./components/LoginForm.jsx";

import "./App.css";

 


const API_URL = import.meta.env.VITE_API_URL;



// const STARTING_TASKS = [

//   { id: 1, title: "Revaleda", available: true },

//   { id: 2, title: "Hands On GT", available: true },

//   { id: 3, title: "Finals", available: true },

//   { id: 4, title: "Metre", available: false },

// ];


async function fetchTasks() {

  const res = await fetch(`${API_URL}/api/tasks`);

  if (!res.ok) {

    throw new Error(`GET /api/tasks answered ${res.status}`);

  }

  return res.json();

}


function App() {

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [token, setToken] = useState("");

  const [loggedInAs, setLoggedInAs] = useState("");


  useEffect(() => {

    async function loadTasks() {

      try {

        const data = await fetchTasks();

        setTasks(data);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }

    }

    loadTasks();

  }, []);

  async function logIn(email, password) {

    const res = await fetch(`${API_URL}/api/auth/login`, {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ email: email, password: password }),

    });

    const data = await res.json();

    if (!res.ok) {

      throw new Error(data.error);

    }

    setToken(data.token);

    setLoggedInAs(email);

  }

 

  function logOut() {

    setToken("");

    setLoggedInAs("");

  }

  async function addTask(title) {

    const res = await fetch(`${API_URL}/api/tasks`, {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,

      },

      body: JSON.stringify({ title: title, available: true }),

    });

    if (!res.ok) {

      const data = await res.json();

      throw new Error(data.error);

    }

    // the new task is in the database now: ask for the list again

    const data = await fetchTasks();

    setTasks(data);

  }


  // function addTask(title) {

  //   const newTask = {

  //     id: Date.now(),

  //     title: title,

  //     available: true,

  //   };

  //   setTasks([...tasks, newTask]);

  // }

  return (

    <main className="library">

      <h1>To Do List</h1>

 

      {token ? (

        <p className="who">

          <span>Logged in as {loggedInAs}</span>

          <button onClick={logOut}>Log out</button>

        </p>

      ) : (

        <LoginForm onLogin={logIn} />

      )}

 

      {token && <TaskForm onAdd={addTask} />}

 

      {loading && <p className="count">Loading tasks...</p>}

      {error && (

        <p className="error">Could not load the tasks: {error}</p>

      )}

      {!loading && !error && (

        <>

          <p className="count">

            {tasks.length} tasks in the catalogue

          </p>

          <TaskList tasks={tasks} />

        </>

      )}

    </main>

  );

}

 

export default App;