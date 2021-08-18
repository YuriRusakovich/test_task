interface Task {
    id: number;
    taskName: string;
    taskDescription: string;
    createdAt: DateOrString;
    updatedAt?: DateOrString;
}

type AddTask = (task: Task) => void;

type UpdateTask = (task: Task) => void;

type DeleteTask = (task: Task) => void;

type FormatDate = (data: DateOrString) => string;

type Void = () => void;

type DateOrString = string | Date;