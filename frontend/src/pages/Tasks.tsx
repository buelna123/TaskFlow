import React, { useEffect, useState } from "react";

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");

    // Simulate fetching tasks
    useEffect(() => {
        // Replace with real API call
        setTasks([
            { id: 1, title: "Primer tarea", completed: false },
            { id: 2, title: "Segunda tarea", completed: true },
        ]);
    }, []);

    const handleAddTask = () => {
        if (newTask.trim() === "") return;
        setTasks([
            ...tasks,
            { id: Date.now(), title: newTask, completed: false },
        ]);
        setNewTask("");
    };

    const toggleTask = (id: number) => {
        setTasks(tasks =>
            tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <div style={{ maxWidth: 500, margin: "2rem auto" }}>
            <h1>Lista de Tareas</h1>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <input
                    type="text"
                    placeholder="Nueva tarea"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                />
                <button onClick={handleAddTask}>Agregar</button>
            </div>
            <ul>
                {tasks.map(task => (
                    <li
                        key={task.id}
                        style={{
                            textDecoration: task.completed ? "line-through" : "none",
                            cursor: "pointer",
                            marginBottom: 8,
                        }}
                        onClick={() => toggleTask(task.id)}
                    >
                        {task.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;