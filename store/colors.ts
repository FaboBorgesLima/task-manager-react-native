import { create } from "zustand";

export const useColors = create<{
    palette: Colors;
    setTheme: (dark: boolean) => void;
}>((set) => ({
    palette: {
        secondary: "#3b0764",
        secondaryContrast: "#f3e8ff",
        background: "#faf5ff",
        backgroundContrast: "#111",
        pure: "#fff",
        primary: "#9333ea",
        primaryContrast: "#fff",
        warning: "#ffe4b5",
        warningContrast: "#f59e0b",
        error: "#f00",
        errorContrast: "#fff",
        success: "#16a34a",
        successContrast: "#fff",
    },
    setTheme: (dark: boolean) => set({}),
}));

export type Colors = {
    secondary: string;
    secondaryContrast: string;
    background: string;
    backgroundContrast: string;
    pure: string;
    primary: string;
    primaryContrast: string;
    warning: string;
    warningContrast: string;
    success: string;
    successContrast: string;
    error: string;
    errorContrast: string;
};
