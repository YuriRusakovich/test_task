import CheckDataService from '../checkDataService/checkData.service';

class LocalstorageService {
    getTasks(): Task[] {
        const data: string | null = localStorage.getItem('Tasks');
        if (data !== null && CheckDataService.isTaskArray(JSON.parse(data))) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    setTasks(tasks: Task[]): void {
        localStorage.setItem('Tasks', JSON.stringify(tasks));
    }

    getCurrentId(): number {
        const data: string | null = localStorage.getItem('currentId');
        if (data !== null && typeof JSON.parse(data) === 'number') {
            return JSON.parse(data);
        } else {
            return 0;
        }
    }

    setCurrentId(id: number): void {
        localStorage.setItem('currentId', id.toString());
    }
}

export default new LocalstorageService();