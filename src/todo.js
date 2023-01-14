import React, { useState } from "react";

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask || newTask.length < 3) {
      setError("Please enter a valid task");
    } else {
      setTasks([...tasks, newTask]);
      setNewTask("");
      setError("");
    }
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleUpdate = (index, updatedTask) => {
    if (!updatedTask) {
      setError("Please enter a task");
    } else {
      const newTasks = [...tasks];
      newTasks[index] = updatedTask;
      setTasks(newTasks);
      setError("");
    }
  };

  return (
    <div>
      <>With form validation</>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => handleDelete(index)}>Delete</button>
            <button
              onClick={() => handleUpdate(index, prompt("Enter updated task"))}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;
