import React from "react";
import { useForm } from "react-hook-form";

import { Button, TextField } from "@material-ui/core";
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { format } from "date-fns";

interface Props {
    task: Task;
    updateTask: UpdateTask;
}

const useStyles = makeStyles(() =>
    createStyles({
        form: {
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '40px'
        },
        createButton: {
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '40px'
        },
        button: {
            marginTop: '15px',
        },
        textArea: {
            marginTop: '15px',
        },
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
        },
        error: {
            padding: '5px 15px',
            color: 'red'
        }
    }),
);

const EditTaskForm: React.FC<Props> = ({task, updateTask}) => {
    const classes = useStyles();

    const { register, handleSubmit, formState: {errors} } = useForm<Task>();

    const onSubmit = handleSubmit((data: Task) => {
        data.taskName = data.taskName ? data.taskName : task.taskName;
        data.taskDescription = data.taskDescription ?
            data.taskDescription : task.taskDescription;
        data.id = task.id;
        data.createdAt = task.createdAt;
        data.updatedAt = format(new Date(), 'd-MM-yyyy, HH:mm:ss');
        updateTask(data);
    });

    return (
        <form className={classes.form}
            onSubmit={onSubmit}
            autoComplete="off">
            <div className={classes.wrapper}>
                <TextField
                    id="taskName"
                    {...register("taskName", {
                        required: "This is required"
                    })}
                    label="Task Name"
                    defaultValue={task.taskName}
                    variant="outlined"
                    size="small"
                />
                {errors.taskName &&
                    <span className={classes.error}>
                        {errors.taskName.message}
                    </span>
                }
                <TextField
                    id="taskDescription"
                    {...register("taskDescription",{
                        required: "This is required"
                    })}
                    label="Task Description"
                    className={classes.textArea}
                    variant="outlined"
                    defaultValue={task.taskDescription}
                    multiline
                    rows={2}
                />
                {errors.taskDescription &&
                    <span className={classes.error}>
                        {errors.taskDescription.message}
                    </span>
                }
                <Button
                    type='submit'
                    className={classes.button}
                    variant="contained"
                    color="primary">
                    Update task
                </Button>
            </div>
        </form>
    );
};

export default EditTaskForm;