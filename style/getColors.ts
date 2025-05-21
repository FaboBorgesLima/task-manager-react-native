export function getColors(isDarkMode: boolean = true) {
    return {
        secondary: isDarkMode ? "#3b0764" : "#3b0764",
        secondaryContrast: isDarkMode ? "#f3e8ff" : "#f3e8ff",
        background: isDarkMode ? "#faf5ff" : "#faf5ff",
        backgroundContrast: isDarkMode ? "#111" : "#111",
        pure: isDarkMode ? "#fff" : "#fff",
        primary: isDarkMode ? "#9333ea" : "#9333ea",
        primaryContrast: isDarkMode ? "#fff" : "#fff",
    };
}
export type Colors = ReturnType<typeof getColors>;
