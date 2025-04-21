import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3008/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  function setTaskStatus (taskId) {
    console.log("changing task status... ", taskId);
    fetch(`http://localhost:3008/tasks/${taskId}`)
      .then(res => res.json())
      .then( task => {
        let newStatus = !task.completed
        return fetch(`http://localhost:3008/tasks/${taskId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ completed: newStatus })
        });
      })
      .then(() => {
        return fetch('http://localhost:3008/tasks')
          .then(res => res.json())
          .then(data => setTasks(data));
      })
      .catch(err => console.error("Error while updating task:", err));
  }

  return (
    <div className='mainContainer'>
      <h1>Tasks:</h1>
      <div className="AllTasksContainer">
        {tasks.map(task => (        
          <div className="taskContainer" key={task.id}>
            <input type="checkbox" checked={task.completed} onChange={() => setTaskStatus(task.id)}/>
            <label htmlFor="vehicle1"> {task.title} </label>
          </div>
        ))}
      </div>

      <button type="button" class="btn btn-primary">Add new task</button>

    </div>
  );
}

export default App;

