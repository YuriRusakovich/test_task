export default class CompareDates {
    static compareTasks(a: Task, b: Task): number {
        if ((a.updatedAt || a.createdAt) && (b.updatedAt || b.createdAt)) {
            const newDateA: Date = new Date(a.updatedAt || a.createdAt);
            const newDateB: Date = new Date(b.updatedAt || b.createdAt);
            return newDateB.getTime() - newDateA.getTime();
        }
        return 0;
    }
}