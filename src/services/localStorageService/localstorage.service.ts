class LocalstorageService {
    getTasks(): Task[] {
        return JSON.parse(localStorage.getItem('Tasks') || '[]');
    }

    setTasks(tasks: Task[]): void {
        localStorage.setItem('Tasks', JSON.stringify(tasks));
    }

    getCurrentId(): number {
        return parseInt(localStorage.getItem('currentId') || '0');
    }

    setCurrentId(id: number): void {
        localStorage.setItem('currentId', id.toString());
    }
}

export default new LocalstorageService();