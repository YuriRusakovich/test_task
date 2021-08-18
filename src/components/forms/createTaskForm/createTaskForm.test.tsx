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
import CreateTaskForm from "@components/forms/createTaskForm";

const addTask = jest.fn();

beforeEach(() => {
    render(<CreateTaskForm addTask={addTask}/>);
});

afterEach(cleanup);

describe('CreateTaskForm', () => {
    it("should show add task button",() => {
        const addTaskButton = screen.getByText(/add task/i);
        expect(addTaskButton).toBeInTheDocument();
    });

    it("should show empty form after click on add task button",
        () => {
            const addTaskButton = screen.getByText(/add task/i);
            fireEvent.click(addTaskButton);
            const createTaskButton = screen.getByText(/create task/i);
            expect(createTaskButton).toBeInTheDocument();
            const inputTaskName = screen.getByLabelText(/task name/i);
            expect(inputTaskName).toHaveValue('');
            const inputTaskDescription = screen
                .getByLabelText(/task description/i);
            expect(inputTaskDescription).toHaveValue('');
        });

    it("should change task name", () => {
        const addTaskButton = screen.getByText(/add task/i);
        fireEvent.click(addTaskButton);
        const inputTaskName = screen.getByLabelText(/task name/i);
        fireEvent.change(inputTaskName, { target: { value: 123}});
        expect(inputTaskName).toHaveValue('123');
    });

    it("should change task description", () => {
        const addTaskButton = screen.getByText(/add task/i);
        fireEvent.click(addTaskButton);
        const inputTaskDescription = screen
            .getByLabelText(/task description/i);
        fireEvent.change(inputTaskDescription, { target: { value: 123}});
        expect(inputTaskDescription).toHaveValue('123');
    });

    it('should have task name error', async () => {
        const addTaskButton = screen.getByText(/add task/i);
        fireEvent.click(addTaskButton);
        const createTaskButton = screen.getByText(/create task/i);
        expect(createTaskButton).toBeInTheDocument();
        const inputTaskDescription = screen
            .getByLabelText(/task description/i);
        fireEvent.change(inputTaskDescription, { target: { value: 234}});
        fireEvent.click(createTaskButton);
        const error = await waitFor(() => screen
            .getByText(/this is required/i));
        expect(error).toBeInTheDocument();
    });

    it('should have task description error', async () => {
        const addTaskButton = screen.getByText(/add task/i);
        fireEvent.click(addTaskButton);
        const createTaskButton = screen.getByText(/create task/i);
        expect(createTaskButton).toBeInTheDocument();
        const inputTaskName = screen
            .getByLabelText(/task name/i);
        fireEvent.change(inputTaskName, { target: { value: 234}});
        fireEvent.click(createTaskButton);
        const error = await waitFor(() => screen
            .getByText(/this is required/i));
        expect(error).toBeInTheDocument();
    });
});