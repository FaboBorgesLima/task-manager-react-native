import {
    TaskRepositoryInterface,
    Task,
} from "@faboborgeslima/task-manager-domain/dist/task";
export class TaskStorage implements TaskRepositoryInterface {
    save(task: Task): Promise<Task> {
        const taskIndex = TaskStorage.tasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
            TaskStorage.tasks[taskIndex] = task;
        } else {
            task.id = (Math.random() * 1_000_000).toString(36);
            TaskStorage.tasks.push(task);
        }
        return Promise.resolve(task);
    }
    findById(id: string): Promise<Task | void> {
        const task = TaskStorage.tasks.find((t) => t.id === id);
        return Promise.resolve(task || undefined);
    }
    findByUser(userId: string): Promise<Task[]> {
        const tasks = TaskStorage.tasks.filter((t) => t.userId === userId);
        return Promise.resolve(tasks);
    }
    findByUserAndDate(
        userId: string,
        startDate: Date,
        endDate: Date
    ): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        const taskIndex = TaskStorage.tasks.findIndex((t) => t.id === id);
        if (taskIndex !== -1) {
            TaskStorage.tasks.splice(taskIndex, 1);
        }
        return Promise.resolve();
    }
    public static tasks: Task[] = [];
}
