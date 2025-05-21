import {
    TaskRepositoryInterface,
    Task,
} from "@faboborgeslima/task-manager-domain/dist/task";
import { TaskConstructorProps } from "@faboborgeslima/task-manager-domain/dist/task/types/task-constructor-props";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class TaskAsyncRepository implements TaskRepositoryInterface {
    private static readonly TASKS_KEY = "tasks";

    private async getAllTasks(): Promise<Task[]> {
        const tasksJson = await AsyncStorage.getItem(
            TaskAsyncRepository.TASKS_KEY
        );

        return tasksJson
            ? (JSON.parse(tasksJson) as TaskConstructorProps[]).map(
                  (task) =>
                      new Task({
                          ...task,
                          start: new Date(task.start),
                          end: new Date(task.end),
                      })
              )
            : [];
    }

    private async saveAllTasks(tasks: Task[]): Promise<void> {
        await AsyncStorage.setItem(
            TaskAsyncRepository.TASKS_KEY,
            JSON.stringify(tasks.map((task) => task.getProps()))
        );
    }

    async save(task: Task): Promise<Task> {
        const tasks = await this.getAllTasks();
        const taskIndex = tasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
            tasks[taskIndex] = task;
        } else {
            task.id = (Math.random() * 1_000_000).toString(36);
            tasks.push(task);
        }
        await this.saveAllTasks(tasks);
        return task;
    }

    async findById(id: string): Promise<Task | void> {
        const tasks = await this.getAllTasks();
        return tasks.find((t) => t.id === id);
    }

    async findByUser(userId: string): Promise<Task[]> {
        const tasks = await this.getAllTasks();
        return tasks.filter((t) => t.userId === userId);
    }

    async findByUserAndDate(
        userId: string,
        startDate: Date,
        endDate: Date
    ): Promise<Task[]> {
        const tasks = await this.getAllTasks();
        return tasks.filter(
            (t) =>
                t.userId === userId &&
                t.end.getTime() >= startDate.getTime() &&
                t.start.getTime() <= endDate.getTime()
        );
    }

    async delete(id: string): Promise<void> {
        const tasks = await this.getAllTasks();
        const updatedTasks = tasks.filter((t) => t.id !== id);
        await this.saveAllTasks(updatedTasks);
    }
}
