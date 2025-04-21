import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function NewTaskForm() {
    const [taskTitle, setTaskTitle] = useState('');

    function handleSubmit(e) {
        // e.preventDefault();
        createNewTask();
    }

    function createNewTask() {
        console.log("creaating new task.. ", taskTitle);
        fetch(`http://localhost:3008/tasks/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: taskTitle })
        });
    };

  return (
    <div className='formContainer'>

        <Link to="/">
            <button className="backButton">
            <i className="bi bi-arrow-left fs-2"></i>
            </button>
        </Link>

        <form onSubmit={handleSubmit}>
            <h2>Add new task</h2>
            <div className="mb-3">
                <label htmlFor="formInputText" className="form-label">
                Task title
                </label>
                <input
                type="text"
                className="form-control"
                id="formInputText"
                required
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                />
            </div>

            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    </div>
  );
}

export default NewTaskForm;

