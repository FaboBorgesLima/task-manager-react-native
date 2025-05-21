import { UserAsyncRepository } from "@/storage/user.async.repository";
import { UserRepositoryInterface } from "@faboborgeslima/task-manager-domain/dist/user";
import { create } from "zustand";

export const userRepository = create<{
    repository: UserRepositoryInterface;
    setRepository: (repository: UserRepositoryInterface) => void;
}>((set) => ({
    repository: new UserAsyncRepository(),
    setRepository: (repository: UserRepositoryInterface) => set({ repository }),
}));
