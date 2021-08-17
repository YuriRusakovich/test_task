import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TaskItem from "@components/items/taskItem/taskItem";
import CompareDates from "@services/compareDates/compareDates";
import { List } from "@material-ui/core";

interface Props {
    tasks: Task[];
    deleteTask: DeleteTask;
    updateTask: UpdateTask;
}

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        wrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        listWrapper: {
            marginTop:  theme.spacing(4),
            position: 'relative',
            overflowY: 'scroll',
            maxHeight: 500,
            '&::-webkit-scrollbar': {
                width: '0.4em'
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                borderRadius: '4px',
            }
        }
    }),
);

const TasksList: React.FC<Props> = ({tasks, deleteTask, updateTask}) => {
    const classes = useStyles();

    const tasksList = tasks.sort(CompareDates.compareTasks)
        .map((task: Task) => (
            <TaskItem
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
            />
        ));

    return (
        <div className={classes.wrapper}>
            <List className={classes.listWrapper} data-testid="list">
                {tasksList}
            </List>
        </div>
    );
};

export default TasksList;