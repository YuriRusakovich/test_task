class CheckData {
    isValidArrayOfTasks = (value: Task[]): value is Task[] => {
        return value.every(this.isValidTask);
    };

    private isValidProperty: (item: Task, value: string) => boolean =
        (item: Task, value: string) => {
            return item.hasOwnProperty(value);
        }

    private isValidTask: (item: Task) => boolean = (item: Task) => {
        return this.isValidProperty(item, 'taskName') &&
            this.isValidProperty(item, 'taskDescription') &&
            this.isValidProperty(item, 'id') &&
            this.isValidProperty(item, 'createdAt');
    }
}

export default new CheckData();