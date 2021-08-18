/**
 * @jest-environment jsdom
 */

import React from 'react';
import {
    render,
    screen,
    waitFor,
    fireEvent,
    cleanup
} from "@testing-library/react";
import EditTaskForm from "@components/forms/editTaskForm";

const task: Task = {
    taskName: 'test2',
    taskDescription: 'test2',
    id: 11,
    createdAt: '2021-08-18T05:21:50.769Z'
};
const updateTask = jest.fn();

beforeEach(() => {
    render(<EditTaskForm
        task={task}
        updateTask={updateTask}/>);
});

afterEach(cleanup);

const showError: (input: HTMLElement) => void = async (input: HTMLElement) => {
    expect(input).toHaveValue('test2');
    fireEvent.change(input, { target: { value: ''}});
    const updateButton = await waitFor(() => screen
        .getByText(/update task/i));
    fireEvent.click(updateButton);
    const error = await waitFor(() => screen
        .getByText(/this is required/i));
    expect(error).toBeInTheDocument();
};

describe('EditTaskForm', () => {
    it('should show edit task from', async () => {
        const inputTaskName = screen.getByLabelText(/task name/i);
        expect(inputTaskName).toHaveValue('test2');
        const inputTaskDescription = screen
            .getByLabelText(/task description/i);
        expect(inputTaskDescription).toHaveValue('test2');
    });

    it ('should show task name error on edit form', async () => {
        const inputTaskName = screen.getByLabelText(/task name/i);
        await showError(inputTaskName);
    });

    it ('should show task description error on edit form',
        async () => {
            const inputTaskDescription = screen
                .getByLabelText(/task description/i);
            await showError(inputTaskDescription);
        });
});