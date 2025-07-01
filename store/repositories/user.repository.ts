import { UserAsyncRepository } from "@/storage/asyncStorage/user.async.repository";
import { UserRepositoryInterface } from "@faboborgeslima/task-manager-domain/dist/user";
import { create } from "zustand";

export const useUserRepository = create<{
    repository: UserRepositoryInterface;
    setRepository: (repository: UserRepositoryInterface) => void;
}>((set) => ({
    repository: new UserAsyncRepository(),
    setRepository: (repository: UserRepositoryInterface) => set({ repository }),
}));
