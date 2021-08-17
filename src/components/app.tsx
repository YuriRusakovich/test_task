import React, {useState} from "react";
import CreateTaskForm from "@components/forms/createTaskForm";
import TasksList from "@components/lists/tasksList";
import Storage from "@services/storage";

const App: React.FC = () => {
    const taskList: Task[] = Storage.getTasks();

    const [tasks, setTasks] = useState(taskList);

    const updateData: (value: any) => void = (value) => {
        Storage.setTasks(value);
        setTasks(value);
    };

    const addTask: AddTask = (task: Task) => {
        updateData([...tasks, task]);
    };

    const updateTask: UpdateTask = (task: Task) => {
        const updatedTasks = tasks.map((taskItem:Task) => {
            return taskItem.id === task.id ? task : taskItem;
        });
        updateData([...updatedTasks]);
    };

    const deleteTask: DeleteTask = (task: Task) => {
        const updatedTasks = tasks.filter((taskItem: Task) => {
            return taskItem.id !== task.id;
        });
        updateData([...updatedTasks]);
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