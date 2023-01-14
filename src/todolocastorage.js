import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ToDolocalstorage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState(null);

  useEffect(() => {
    // Retrieve tasks from local storage when the component is mounted
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    // Save tasks to local storage when the tasks state is updated
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask) {
      alert("Please enter a task");
    } else {
      setTasks([...tasks, { task: newTask, dueDate: dueDate }]);
      setNewTask("");
      setDueDate(null);
    }
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleUpdate = (index, updatedTask, updatedDueDate) => {
    if (!updatedTask) {
      alert("Please enter a task");
    } else {
      const newTasks = [...tasks];
      newTasks[index] = { task: updatedTask, dueDate: updatedDueDate };
      setTasks(newTasks);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          placeholderText="Select due date"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.task} - Due date:{" "}
            {task.dueDate ? task.dueDate.toString() : "Not set"}
            <button onClick={() => handleDelete(index)}>Delete</button>
            <button
              onClick={() =>
                handleUpdate(
                  index,
                  prompt("Enter updated task"),
                  prompt("Enter updated due date (yyyy-mm-dd)")
                )
              }
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDolocalstorage;
