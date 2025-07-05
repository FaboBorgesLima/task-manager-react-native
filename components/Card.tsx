import { Rem } from "@/constants/rem";
import { useColors } from "@/store/colors";
import { forwardRef } from "react";
import { StyleSheet, View } from "react-native";

export const Card = forwardRef<View, View["props"]>((props, ref) => {
    const palette = useColors((state) => state.palette);
    return (
        <View
            ref={ref}
            {...props}
            style={{
                ...((props.style as object) || {}),
                ...styleSheet.container,
                backgroundColor: palette.pure,
            }}
        ></View>
    );
});

export const styleSheet = StyleSheet.create({
    container: {
        display: "flex",
        boxShadow: "#000",
        elevation: Rem.MEDIUM,
        borderRadius: Rem.XLARGE,
        overflow: "hidden",
    },
});
