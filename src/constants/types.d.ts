interface Task {
    id: number;
    taskName: string;
    taskDescription: string;
    createdAt: string;
    updatedAt?: string;
}

type AddTask = (task: Task) => void;

type UpdateTask = (task: Task) => void;

type DeleteTask = (task: Task) => void;

type Void = () => void;