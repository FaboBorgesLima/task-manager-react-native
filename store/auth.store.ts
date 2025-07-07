import { Auth } from "@faboborgeslima/task-manager-domain/dist/auth";
import { create } from "zustand";

export const useAuthStore = create<{
    auth: Auth | null;
    setAuth: (auth: Auth | null) => void;
    clearAuth: () => void;
}>((set) => ({
    auth: null,
    setAuth: (auth: Auth | null) => set({ auth }),
    clearAuth: () => set({ auth: null }),
}));
