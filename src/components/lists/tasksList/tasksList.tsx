import React from "react";
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
            flexDirection: 'column',
        },
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
        }
    }),
);

type FormData = {
    id: number,
    taskName: string,
    taskDescription: string,
    currentDate: string,
}

const TasksList: React.FC = () => {
    const classes = useStyles();

    let tasks: FormData[] = JSON
        .parse(localStorage.getItem('Tasks') || '[]');

    React.useEffect(() => {
        document.addEventListener('taskAdded', () => {
            tasks = JSON
                .parse(localStorage.getItem('Tasks') || '[]');
        });
    }, []);

    const tasksList = tasks.map((task: FormData) => {
        return (
            <li key={task.id}>
                {task.taskName}
            </li>
        );
    });

    return (
        <div className={classes.container}>
            <ul>
                {tasksList}
            </ul>
        </div>
    );
};

export default TasksList;