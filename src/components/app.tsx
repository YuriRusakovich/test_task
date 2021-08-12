import React, {useState} from "react";

import CreateTaskForm from "./forms/createTaskForm/createTaskForm";
import TasksList from "./lists/tasksList/tasksList";

import LocalstorageService from
    "../services/localStorageService/localstorage.service";

const App: React.FC = () => {
    const taskList: Task[] = LocalstorageService.getTasks();

    const [tasks, setTasks] = useState(taskList);

    const addTask: AddTask = (task: Task) => {
        LocalstorageService.setTasks([...tasks, task]);
        setTasks([...tasks, task]);
    };

    const updateTask: UpdateTask = (task: Task) => {
        const updatedTasks = tasks.map((taskItem:Task) => {
            return taskItem.id === task.id ? task : taskItem;
        });
        LocalstorageService.setTasks([...updatedTasks]);
        setTasks([...updatedTasks]);
    };

    const deleteTask: DeleteTask = (task: Task) => {
        const updatedTasks = tasks.filter((taskItem: Task) => {
            return taskItem.id !== task.id;
        });
        LocalstorageService.setTasks([...updatedTasks]);
        setTasks([...updatedTasks]);
    };

    return (
        <>
            <CreateTaskForm addTask={addTask}/>
            <TasksList
                tasks={taskList}
                deleteTask={deleteTask}
                updateTask={updateTask}
            />
        </>
    );
};

export default App;