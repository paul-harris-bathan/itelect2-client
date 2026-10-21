function TaskList({ tasks }) {

  return (

    <ul className="task-list">

      {tasks.map((task) => (

        <li key={task.id}>

          <span>{task.title}</span>

          <span className="status">

            {task.available ? "Active" : "In Progress"}

          </span>

        </li>

      ))}

    </ul>

  );

}

 

export default TaskList;