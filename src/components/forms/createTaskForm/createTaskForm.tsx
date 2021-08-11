import React from "react";
import { Button, TextField } from "@material-ui/core";
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { useForm } from "react-hook-form";
import moment from "moment";

type FormData = {
    id: number,
    taskName: string,
    taskDescription: string,
    currentDate: string,
}

const useStyles = makeStyles(() =>
    createStyles({
        form: {
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
        }
    }),
);

const CreateTaskForm: React.FC = () => {
    const classes = useStyles();

    let id: number = parseInt(localStorage
        .getItem('currentId') || '0');

    const tasks: FormData[] = JSON.parse(localStorage.getItem('Tasks') || '[]');

    const { register, handleSubmit, reset } = useForm<FormData>();

    const onSubmit = handleSubmit((data: FormData) => {
        const event = new Event('taskAdded');

        id++;
        data.currentDate = moment(new Date())
            .format('MMMM D YYYY, h:mm:ss');
        tasks.push(data);
        localStorage.setItem('Tasks', JSON.stringify(tasks));
        localStorage.setItem('currentId', id.toString());
        document.dispatchEvent(event);
        reset();
    });

    return (
        <form className={classes.form} onSubmit={onSubmit} autoComplete="off">
            <div className={classes.wrapper}>
                <TextField
                    id="taskName"
                    {...register("taskName")}
                    label="Task Name"
                    variant="outlined"
                    size="small"
                    required
                />
                <TextField
                    id="taskDescription"
                    {...register("taskDescription")}
                    label="Task Description"
                    className={classes.textArea}
                    variant="outlined"
                    multiline
                    rows={2}
                    required
                />
                <Button
                    type='submit'
                    className={classes.button}
                    variant="contained"
                    color="primary">
                    Create task
                </Button>
            </div>
        </form>
    );
};

export default CreateTaskForm;