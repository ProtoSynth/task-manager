import React, { useState } from "react";
import Done from "../../components/buttons/done/Done";
import CreateTask from "../../components/buttons/create-task/CreateTask";

export default function TaskListView() {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const handleTaskDone = (taskId) => {
        setTasks((prevTasks) => 
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, isComplete: true} : task
            )
        );
    };

    const handleAddTask = () => {
        if (newTaskTitle.trim() === "") {
            return;
        }

        const newTask = {
            id: Date.now(),
            title: newTaskTitle,
            isComplete: false,
        };

        setTasks((prevTasks) => [ ...prevTasks, newTask ]);
        setNewTaskTitle("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleAddTask();
        }
    };

    const handleDeleteAllTasks = () => {
        setTasks([]);
    };

    return(
        <div>
            <h1>
                Task Manager
            </h1>
            <div>
                <input 
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <CreateTask 
                    onClickProp={handleAddTask}
                    textProp="Create Task"
                />
                
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <Done 
                            isComplete={task.isComplete}
                            onClick={() => handleTaskDone(task.id)}
                        >
                            {task.isComplete ? "✓" : "Done"}
                        </Done>
                        <span style={{
                            textDecoration: task.isComplete ? "line-through" : "none",
                        }}>
                            {task.title}
                        </span>
                    </li>
                ))}
                <button onClick={handleDeleteAllTasks}>
                    Delete All
                </button>
            </ul>
        </div>
    );
}