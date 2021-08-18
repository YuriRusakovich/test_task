/**
 * @jest-environment jsdom
 */

import React from 'react';
import {
    render,
    screen,
    waitFor,
    cleanup
} from "@testing-library/react";
import TasksList from "@components/lists/tasksList";
import CompareDates from "@services/compareDates";

const taskArray: any[] = [
    {
        taskName: 'test1',
        taskDescription: 'test1',
        id: 10,
        createdAt: '2021-08-18T06:21:43.769Z'
    },
    {
        taskName: 'test2',
        taskDescription: 'test2',
        id: 11,
        createdAt: '2021-08-18T05:21:50.769Z'
    }
];
const deleteTask = jest.fn();
const updateTask = jest.fn();

afterEach(cleanup);

describe('TasksList', () => {
    it('should display task list', async () => {
        render(<TasksList
            tasks={taskArray}
            deleteTask={deleteTask}
            updateTask={updateTask}/>);
        const showMoreButton = await waitFor(() => screen
            .getByTestId('showMore-10'));
        expect(showMoreButton).toBeInTheDocument();
    });

    it('should not compare dates if task have no createdAt', () => {
        const mockTask1 = {
            createdAt: new Date()
        };
        const mockTask2 = {
        };
        const a = CompareDates.compareTasks(mockTask1, mockTask2);
        expect(a).toBe(0);
    });
});