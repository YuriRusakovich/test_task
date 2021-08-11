import React from "react";
import CreateTaskForm from "./forms/createTaskForm/createTaskForm";
import TasksList from "./lists/tasksList/tasksList";

const App: React.FC = () => {
    return (
        <>
            <CreateTaskForm/>
            <TasksList/>
        </>
    );
};

export default App;