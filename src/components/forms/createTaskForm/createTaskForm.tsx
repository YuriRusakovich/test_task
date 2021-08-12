import React, {useState} from "react";
import { useForm } from "react-hook-form";

import { Button, TextField } from "@material-ui/core";
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { format } from "date-fns";

import LocalstorageService from
    "../../../services/localStorageService/localstorage.service";

interface Props {
    addTask: AddTask;
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
        data.createdAt = format(new Date(), 'd-MM-yyyy, HH:mm:ss');
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
                            required: "This is required"
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
                            required: "This is required"
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