import { getColors } from "@/style/getColors";
import { create } from "zustand";

export const useColors = create<{
    palette: ReturnType<typeof getColors>;
    setTheme: (dark: boolean) => void;
}>(() => ({
    palette: getColors(),
    setTheme: (dark: boolean) => getColors(dark),
}));
