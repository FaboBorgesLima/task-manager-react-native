import { StyleSheet } from "react-native";
import { getColors } from "./getColors";
import { Typo } from "../constants/typo";
import { Rem } from "@/constants/rem";

export default (palette: ReturnType<typeof getColors>) =>
    StyleSheet.create({
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: Rem.LARGE,
            gap: Rem.LARGE,
            flex: 1,
            backgroundColor: palette.background,
        },
        formText: {
            fontWeight: "bold",
            textAlign: "center",
            fontSize: Typo.SMALL,
        },
        formHeader: {
            backgroundColor: palette.secondary,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: Rem.MEDIUM,
            padding: Rem.LARGE,
        },
        formBody: {
            minWidth: "75%",
            padding: Rem.LARGE,
            display: "flex",
            gap: Rem.LARGE,
        },
        formButton: {
            backgroundColor: palette.primary,
            padding: Rem.LARGE,
            borderRadius: Rem.XLARGE,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        formButtonText: {
            color: palette.secondaryContrast,
            fontSize: Typo.LARGE,
            fontWeight: "bold",
        },
    });
