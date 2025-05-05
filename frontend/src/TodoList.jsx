import React, { useState, useEffect } from "react";

const ToDoList = ({ username, onLogout }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('/api/tasks');
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = async () => {
        if (newTask.trim() !== "") {
            try {
                const response = await fetch('/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: newTask }),
                });
                const data = await response.json();
                setTasks([...tasks, data]);
                setNewTask("");
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };

    const deleteTask = async (id) => {
        try {
            await fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
            });
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const moveTaskUp = async (index) => {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
            // TODO: Add API call to update task order
        }
    };

    const moveTaskDown = async (index) => {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
            // TODO: Add API call to update task order
        }
    };

    return (
        <div className="to-do-list">
            <h1>To-Do App</h1>
            <br />

            <div>
                <input type="text" placeholder="Enter a task..." value={newTask} onChange={handleInputChange} />
                <button className="add-button" onClick={addTask}>Add</button>
            </div>

            <br />
            <ol>
                {tasks.map((task, index) => (
                    <li key={task.id}>
                        <span className="text">{task.text}</span>
                        <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
                        <button className="move-button" onClick={() => moveTaskUp(index)}>☝</button>
                        <button className="move-button" onClick={() => moveTaskDown(index)}>👇</button>
                    </li>
                ))}
            </ol>
            <div> 
                <button className="logout-button" onClick={onLogout}>Logout</button>
            </div>
        </div>
    );
};

export default ToDoList;