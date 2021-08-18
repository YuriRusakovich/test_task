import CheckData from '@services/checkData';

class Storage {
    static getTasks(): Task[] {
        const data: string | null = localStorage.getItem('Tasks');
        const parsedData = data ? JSON.parse(data) : null;
        if (parsedData && CheckData.isValidArrayOfTasks(parsedData)) {
            return parsedData;
        }
        return [];
    }

    static setTasks(tasks: Task[]): void {
        localStorage.setItem('Tasks', JSON.stringify(tasks));
    }

    static getCurrentId(): number {
        const data: string | null = localStorage.getItem('currentId');
        const parsedData = data ? JSON.parse(data) : null;
        if (parsedData && typeof parsedData === 'number') {
            return parsedData;
        }
        return 0;
    }

    static setCurrentId(id: number): void {
        localStorage.setItem('currentId', id.toString());
    }
}

export default Storage;