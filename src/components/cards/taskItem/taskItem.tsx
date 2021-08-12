import React, {useState} from "react";

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {
    Card, CardActions,
    CardContent,
    CardHeader,
    Collapse,
    IconButton,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import clsx from "clsx";

import EditTaskForm from "../../forms/editTaskForm/editTaskForm";

interface Props {
    task: Task;
    deleteTask: DeleteTask;
    updateTask: UpdateTask;
}

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        container: {
            display: 'flex',
            justifyContent: 'center',
            margin: '10px 0',
            width: '500px',
            flexDirection: 'column'
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        cardContent: {
            padding: '0 16px',
            margin: '20px 0',
            width: '500px',
            '&:last-child': {
                padding: '0 16px',
            }
        }
    }),
);

const TaskItem: React.FC<Props> = ({task, deleteTask, updateTask}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleExpandClick: Void = () => {
        setExpanded(!expanded);
    };

    const handleDeleteTask: Void = () => {
        deleteTask(task);
    };

    const handleIsEditChange: Void = () => {
        setIsEdit(true);
    };

    const handleUpdateTask: UpdateTask = (taskItem:Task) => {
        updateTask(taskItem);
        setIsEdit(false);
    };

    return (
        <>
            {isEdit &&
                <EditTaskForm task={task} updateTask={handleUpdateTask}/>
            }
            {!isEdit &&
                <Card className={classes.container}>
                    <CardHeader
                        title={`Task Name: ${task.taskName}`}
                        subheader={`${task.updatedAt ?
                            'Updated At:' : 'Created At:'} 
                            ${task.updatedAt || task.createdAt}`}
                        action={
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        }
                    />
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent className={classes.cardContent}>
                            Task Description:
                        </CardContent>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="body2"
                                color="textSecondary"
                                component="p">
                                {task.taskDescription}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton onClick={handleDeleteTask}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={handleIsEditChange}>
                                <EditIcon />
                            </IconButton>
                        </CardActions>
                    </Collapse>
                </Card>
            }
        </>
    );
};

export default TaskItem;