import { AuthAsyncRepository } from "@/storage/auth.async.repository";
import { AuthRepositoryInterface } from "@faboborgeslima/task-manager-domain/dist/auth";
import { create } from "zustand";

export const useAuthRepository = create<{
    repository: AuthRepositoryInterface;
    setRepository: (repository: AuthRepositoryInterface) => void;
}>((set) => ({
    repository: new AuthAsyncRepository(),
    setRepository: (repository: AuthRepositoryInterface) => set({ repository }),
}));
