/**
 * @jest-environment jsdom
 */

import React from 'react';
import {
    render,
    screen,
    fireEvent,
    waitFor,
    cleanup
} from "@testing-library/react";
import App from "./app";

beforeEach(() => {
    render(<App />);
});

afterEach(() => {
    cleanup();
});

describe("App", () => {
    it("should render App",() => {
        const addTaskButton = screen.getByText(/add task/i);
        expect(addTaskButton).toBeInTheDocument();
    });
});

describe('Task item save', () => {
    it("should save 2 task items", async () => {
        const addTaskButton = screen.getByText(/add task/i);
        fireEvent.click(addTaskButton);
        const createTaskButton = screen.getByText(/create task/i);
        expect(createTaskButton).toBeInTheDocument();
        const inputTaskName = screen.getByLabelText(/task name/i);
        fireEvent.change(inputTaskName, { target: { value: 123}});
        const inputTaskDescription = screen
            .getByLabelText(/task description/i);
        fireEvent.change(inputTaskDescription, { target: { value: 123}});
        fireEvent.click(createTaskButton);
        const listNode = await waitFor(() => screen
            .getByTestId('list'));
        expect(listNode.children).toHaveLength(1);
        const addTaskButton2 = screen.getByText(/add task/i);
        fireEvent.click(addTaskButton2);
        const createTaskButton2 = screen.getByText(/create task/i);
        expect(createTaskButton2).toBeInTheDocument();
        const inputTaskName2 = screen.getByLabelText(/task name/i);
        fireEvent.change(inputTaskName2, { target: { value: 234}});
        const inputTaskDescription2 = screen
            .getByLabelText(/task description/i);
        fireEvent.change(inputTaskDescription2,
            { target: { value: 234}});
        fireEvent.click(createTaskButton2);
        const listNode2 = await waitFor(() => screen
            .getByTestId('list'));
        expect(listNode2.children).toHaveLength(2);
    });
});

describe('Task item updates', () => {
    beforeEach(async () => {
        const showMoreButton = await waitFor(() => screen
            .getByTestId('showMore-1'));
        expect(showMoreButton).toBeInTheDocument();
        fireEvent.click(showMoreButton);
        const taskDescription = screen.getByText(/task description/i);
        expect(taskDescription).toBeInTheDocument();
    });
    it ('should change task name and task description on edit form',
        async () => {
            const editButton = await waitFor(() => screen
                .getByTestId('edit-1'));
            expect(editButton).toBeInTheDocument();
            fireEvent.click(editButton);
            const inputTaskName = screen.getByLabelText(/task name/i);
            fireEvent.change(inputTaskName, { target: { value: 'test'}});
            expect(inputTaskName).toHaveValue('test');
            const inputTaskDescription = screen
                .getByLabelText(/task description/i);
            fireEvent.change(inputTaskDescription,
                { target: { value: 'test'}});
            expect(inputTaskDescription).toHaveValue('test');
            const updateButton = await waitFor(() => screen
                .getByText(/update task/i));
            fireEvent.click(updateButton);
            const updateText = await waitFor(() => screen
                .getByText(/updated at/i));
            expect(updateText).toBeInTheDocument();
        });

    it ('should delete task item', async () => {
        const deleteButton = await waitFor(() => screen
            .getByTestId('delete-1'));
        expect(deleteButton).toBeInTheDocument();
        fireEvent.click(deleteButton);
        const listNode = await waitFor(() => screen
            .getByTestId('list'));
        expect(listNode.children).toHaveLength(1);
    });
});