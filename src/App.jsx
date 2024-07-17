import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const editTask = (index) => {
        setIsEditing(true);
        setCurrentTaskIndex(index);
        setNewTask(tasks[index].text);
    };

    const updateTask = () => {
        let updatedTasks = tasks.map((task, index) => {
            if (index === currentTaskIndex) {
                return { ...task, text: newTask };
            }
            return task;
        });
        setTasks(updatedTasks);
        setIsEditing(false);
        setNewTask('');
        setCurrentTaskIndex(null);
    };

    const removeTask = (index) => {
        let filteredTasks = tasks.filter((_, i) => i !== index);
        setTasks(filteredTasks);
    };

    const toggleCompletion = (index) => {
        let updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <div className="App">
            <div className="todo-list">
                <h1>Todo List</h1>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter a task"
                />
                <button onClick={isEditing ? updateTask : addTask}>
                    {isEditing ? 'Update Task' : 'Add Task'}
                </button>
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index} className={task.completed ? 'completed' : ''}>
                            {task.text}
                            <button onClick={() => toggleCompletion(index)}>Complete</button>
                            <button onClick={() => editTask(index)}>Edit</button>
                            <button onClick={() => removeTask(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App
