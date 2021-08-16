class CheckDataService {
    isTaskArray = (value: any): value is Task[] => {
        let isValid: boolean = false;
        value.forEach((item: any) => {
            isValid = (item.hasOwnProperty('taskName') && item.taskName) &&
                (item.hasOwnProperty('taskDescription') &&
                    item.taskDescription) &&
                (item.hasOwnProperty('id') &&
                    item.id) && (item.hasOwnProperty('createdAt') &&
                    item.createdAt);
        });
        return isValid;
    };
}

export default new CheckDataService();