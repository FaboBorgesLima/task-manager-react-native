import { AxiosInstance } from "axios";
import { create } from "zustand";

export const useAxiosStore = create<{
    axiosInstance: AxiosInstance | null;
    setAxiosInstance: (axiosInstance: AxiosInstance) => void;
}>((set) => ({
    axiosInstance: null,
    setAxiosInstance: (axiosInstance: AxiosInstance) => set({ axiosInstance }),
}));
