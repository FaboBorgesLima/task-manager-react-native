import { TaskStatus } from "@faboborgeslima/task-manager-domain/dist/task";

export type TaskHttpProps = {
    id: string;
    title: string;
    description: string;
    start: string;
    end: string;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string;
    userId: string;
};
