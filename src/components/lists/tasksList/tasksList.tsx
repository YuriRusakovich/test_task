import React from "react";

import { createStyles, makeStyles } from '@material-ui/core/styles';

import TaskItem from "../../cards/taskItem/taskItem";

import CompareDatesService from
    "../../../services/compareDatesService/compareDates.service";
import { List } from "@material-ui/core";

interface Props {
    tasks: Task[];
    deleteTask: DeleteTask;
    updateTask: UpdateTask;
}

const useStyles = makeStyles(() =>
    createStyles({
        wrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        listWrapper: {
            marginTop: '30px',
            position: 'relative',
            overflowY: 'scroll',
            maxHeight: '500px',
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

    const tasksList = tasks.sort(CompareDatesService.compareTasks)
        .map((task: Task) => {
            return (
                <TaskItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                />
            );
        });

    return (
        <div className={classes.wrapper}>
            <List className={classes.listWrapper}>
                {tasksList}
            </List>
        </div>
    );
};

export default TasksList;