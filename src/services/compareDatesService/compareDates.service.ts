class CompareDatesService {
    compareTasks(a: Task, b: Task): number {
        const newDateA: Date = new Date(a.updatedAt || a.createdAt);
        const newDateB: Date = new Date(b.updatedAt || b.createdAt);
        if (newDateA && newDateB) {
            return newDateB.getTime() - newDateA.getTime();
        } else {
            return 0;
        }
    }
}

export default new CompareDatesService();