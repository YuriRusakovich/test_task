/**
 * @jest-environment jsdom
 */

import React from 'react';
import {render, screen, fireEvent, waitFor, act} from "@testing-library/react";
import App from "../src/components/app";

beforeEach(() => {
    render(<App />);
})

describe("App", () => {
    it("should render correctly",() => {
        const addTaskButton = screen.getByText(/add task/i);
        expect(addTaskButton).toBeInTheDocument();
    });

    it("should display empty form after click on add task button",
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
        const createTaskButton = screen.getByText(/create task/i);
        expect(createTaskButton).toBeInTheDocument();
        const inputTaskName = screen.getByLabelText(/task name/i);
        fireEvent.change(inputTaskName, { target: { value: 123}});
        expect(inputTaskName).toHaveValue('123');
    });

    it("should change task description", () => {
        const addTaskButton = screen.getByText(/add task/i);
        fireEvent.click(addTaskButton);
        const createTaskButton = screen.getByText(/create task/i);
        expect(createTaskButton).toBeInTheDocument();
        const inputTaskDescription = screen
            .getByLabelText(/task description/i);
        fireEvent.change(inputTaskDescription, { target: { value: 123}});
        expect(inputTaskDescription).toHaveValue('123');
    });

    it("should save task item", () => {
        const addTaskButton = screen.getByText(/add task/i);
        fireEvent.click(addTaskButton);
        const createTaskButton = screen.getByText(/create task/i);
        expect(createTaskButton).toBeInTheDocument();
        const inputTaskName = screen.getByLabelText(/task name/i);
        fireEvent.change(inputTaskName, { target: { value: 123}});
        const inputTaskDescription = screen
            .getByLabelText(/task description/i);
        fireEvent.change(inputTaskDescription, { target: { value: 123}});
        jest.spyOn(window.localStorage.__proto__, 'setItem');
        fireEvent.click(createTaskButton);
    });
});