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
import TaskItem from "@components/items/taskItem";

const task: any = {
    taskName: 'test2',
    taskDescription: 'test2',
    id: 11,
    createdAt: '2021-08-18T05:21:50.769Z'
};
const deleteTask = jest.fn();
const updateTask = jest.fn();

beforeEach(() => {
    render(<TaskItem
        task={task}
        deleteTask={deleteTask}
        updateTask={updateTask}/>);
});

afterEach(cleanup);

const clickShowMoreButton: () => void = async () => {
    const showMoreButton = await waitFor(() => screen
        .getByTestId('showMore-11'));
    expect(showMoreButton).toBeInTheDocument();
    fireEvent.click(showMoreButton);
};

describe('TasksItem', () => {
    it('should display task item', async () => {
        const showMoreButton = await waitFor(() => screen
            .getByTestId('showMore-11'));
        expect(showMoreButton).toBeInTheDocument();
    });

    it('should show task description after click on show more button',
        async () => {
            await clickShowMoreButton();
            const taskDescription = screen
                .getByText(/task description/i);
            expect(taskDescription).toBeInTheDocument();
        });

    it ('should show edit form', async () => {
        await clickShowMoreButton();
        const editButton = await waitFor(() => screen
            .getByTestId('edit-11'));
        expect(editButton).toBeInTheDocument();
        fireEvent.click(editButton);
        const inputTaskName = screen.getByLabelText(/task name/i);
        expect(inputTaskName).toHaveValue('test2');
        const inputTaskDescription = screen
            .getByLabelText(/task description/i);
        expect(inputTaskDescription).toHaveValue('test2');
    });
});