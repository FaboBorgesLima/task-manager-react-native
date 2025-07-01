import {
    Task,
    TaskRepositoryInterface,
} from "@faboborgeslima/task-manager-domain/dist/task";
import { AxiosInstance } from "axios";
import { TaskHttpProps } from "./@types/task-http-props";

export class TaskHttpRespository implements TaskRepositoryInterface {
    protected httpClient: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.httpClient = axiosInstance;
    }

    private async updateTask(id: string, task: Task): Promise<Task> {
        const response = await this.httpClient.put<TaskHttpProps>(
            `/tasks/${id}`,
            task
        );

        return new Task({
            ...response.data,
            ...{
                updatedAt: new Date(response.data.updatedAt),
                createdAt: new Date(response.data.createdAt),
                start: new Date(response.data.start),
                end: new Date(response.data.end),
            },
        });
    }

    async save(task: Task): Promise<Task> {
        if (task.id) return this.updateTask(task.id, task);

        const result = await this.httpClient.post<TaskHttpProps>("/tasks", {
            title: task.title,
            description: task.description,
            start: task.start,
            end: task.end,
            status: task.status,
            userId: task.userId,
        });
        return new Task({
            ...result.data,
            ...{
                updatedAt: new Date(result.data.updatedAt),
                createdAt: new Date(result.data.createdAt),
                start: new Date(result.data.start),
                end: new Date(result.data.end),
            },
        });
    }

    async findById(id: string): Promise<Task | void> {
        const response = await this.httpClient.get<TaskHttpProps>(
            `/tasks/${id}`
        );

        if (!response.data) {
            return;
        }

        return new Task({
            ...response.data,
            ...{
                updatedAt: new Date(response.data.updatedAt),
                createdAt: new Date(response.data.createdAt),
                start: new Date(response.data.start),
                end: new Date(response.data.end),
            },
        });
    }

    async findByUser(
        userId: string,
        size: number,
        page: number
    ): Promise<Task[]> {
        const response = await this.httpClient.get<TaskHttpProps[]>(
            `/tasks/users/${userId}/`,
            {
                params: { size, page },
            }
        );

        return response.data.map(
            (task) =>
                new Task({
                    ...task,
                    ...{
                        updatedAt: new Date(task.updatedAt),
                        createdAt: new Date(task.createdAt),
                        start: new Date(task.start),
                        end: new Date(task.end),
                    },
                })
        );
    }

    async findByUserAndDate(
        userId: string,
        startDate: Date,
        endDate: Date,
        size: number,
        page: number
    ): Promise<Task[]> {
        const response = await this.httpClient.get<TaskHttpProps[]>(
            `/tasks/users/${userId}`,
            {
                params: {
                    start: startDate.toISOString(),
                    end: endDate.toISOString(),
                    size,
                    page,
                },
            }
        );
        return response.data.map(
            (task) =>
                new Task({
                    ...task,
                    ...{
                        updatedAt: new Date(task.updatedAt),
                        createdAt: new Date(task.createdAt),
                        start: new Date(task.start),
                        end: new Date(task.end),
                    },
                })
        );
    }

    async delete(id: string): Promise<void> {
        await this.httpClient.delete(`/tasks/${id}`);
    }
}
