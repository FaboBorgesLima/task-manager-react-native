import { StyleSheet } from "react-native";
import { getColors } from "./colors";
import { getTypo } from "./typo";

export default StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        gap: 16,
        flex: 1,
        backgroundColor: getColors().background,
    },
    formText: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: getTypo().small,
    },
    formHeader: {
        backgroundColor: getColors().secondary,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        padding: 16,
    },
    formBody: {
        minWidth: "75%",
        padding: 16,
        display: "flex",
        gap: 16,
    },
    formButton: {
        backgroundColor: getColors().secondary,
        padding: 16,
        borderRadius: 32,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    formButtonText: {
        color: getColors().secondaryContrast,
        fontSize: getTypo().small,
        fontWeight: "bold",
    },
});
