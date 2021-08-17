class CheckData {
    isValidArrayOfTasks = (value: any): value is Task[] => {
        return value.every(this.isValidTask);
    };

    private isValidProperty: (item: any, value: string) => boolean =
        (item: any, value:string) => {
            return item.hasOwnProperty(value) && item[value];
        }

    private isValidTask: (item: any) => boolean = (item:any) => {
        return this.isValidProperty(item, 'taskName') &&
            this.isValidProperty(item, 'taskDescription') &&
            this.isValidProperty(item, 'id') &&
            this.isValidProperty(item, 'createdAt');
    }
}

export default new CheckData();