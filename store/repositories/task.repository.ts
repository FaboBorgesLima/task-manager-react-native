import { TaskAsyncRepository } from "@/storage/task.async.repository";
import { TaskRepositoryInterface } from "@faboborgeslima/task-manager-domain/dist/task";
import { create } from "zustand";

export const useTaskRepository = create<{
    repository: TaskRepositoryInterface;
    setRepository: (repository: TaskRepositoryInterface) => void;
}>((set) => ({
    repository: new TaskAsyncRepository(),
    setRepository: (repository: TaskRepositoryInterface) => set({ repository }),
}));
