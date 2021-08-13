import React from "react";
import { useForm } from "react-hook-form";

import { Button, TextField } from "@material-ui/core";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

interface Props {
    task: Task;
    updateTask: UpdateTask;
}

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        form: {
            display: 'flex',
            justifyContent: 'center',
            paddingTop: theme.spacing(5)
        },
        createButton: {
            display: 'flex',
            justifyContent: 'center',
            paddingTop: theme.spacing(5)
        },
        button: {
            marginTop: theme.spacing(3),
        },
        textArea: {
            marginTop: theme.spacing(3),
        },
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
        },
        error: {
            padding: theme.spacing(1, 4),
            color: 'red',
            maxWidth: 200
        }
    }),
);

const EditTaskForm: React.FC<Props> = ({task, updateTask}) => {
    const classes = useStyles();

    const { register,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm<Task>({
        defaultValues: {
            taskName: task.taskName,
            taskDescription: task.taskDescription
        }
    });

    const onSubmit = handleSubmit((data: Task) => {
        data.taskName = data.taskName ? data.taskName : task.taskName;
        data.taskDescription = data.taskDescription ?
            data.taskDescription : task.taskDescription;
        data.id = task.id;
        data.createdAt = task.createdAt;
        data.updatedAt = new Date();
        updateTask(data);
    });

    const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void =
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.name === 'taskName') {
                setValue('taskName', event.target.value);
            } else {
                setValue('taskDescription', event.target.value);
            }
        };

    return (
        <form className={classes.form}
            onSubmit={onSubmit}
            autoComplete="off">
            <div className={classes.wrapper}>
                <TextField
                    id="taskName"
                    {...register("taskName", {
                        required: "This is required",
                        pattern: {
                            value: /^[^\s]+(?:$|.*[^\s]+$)/,
                            message: `Entered value can not start/end or 
                                contain only white spacing`
                        },
                    })}
                    label="Task Name"
                    defaultValue={task.taskName}
                    onChange={handleChange}
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
                        required: "This is required",
                        pattern: {
                            value: /^[^\s]+(?:$|.*[^\s]+$)/,
                            message: `Entered value can not start/end or 
                                contain only white spacing`
                        },
                    })}
                    label="Task Description"
                    className={classes.textArea}
                    variant="outlined"
                    defaultValue={task.taskDescription}
                    onChange={handleChange}
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