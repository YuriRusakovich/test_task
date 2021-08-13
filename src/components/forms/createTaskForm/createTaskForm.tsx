import React, {useState} from "react";
import { useForm } from "react-hook-form";

import { Button, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import LocalstorageService from
    "../../../services/localStorageService/localstorage.service";

interface Props {
    addTask: AddTask;
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

const CreateTaskForm: React.FC<Props> = ({addTask}) => {
    const classes = useStyles();

    const [showForm, setShowForm] = useState(false);

    let id: number = LocalstorageService.getCurrentId();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<Task>();

    const onSubmit = handleSubmit((data: Task) => {
        id++;
        data.id = id;
        data.createdAt = new Date();
        LocalstorageService.setCurrentId(id);
        addTask(data);
        reset();
        setShowForm(false);
    });

    const changeShowForm: Void = () => {
        setShowForm(true);
    };

    return (
        <>
            {!showForm &&
                <div className={classes.createButton}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={changeShowForm}>
                        Add Task
                    </Button>
                </div>
            }
            {showForm &&
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
                        {...register("taskDescription", {
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
                        Create task
                    </Button>
                </div>
            </form>
            }
        </>
    );
};

export default CreateTaskForm;