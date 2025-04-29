import { View, Text, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren) {
    return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgb(249 249 249)",
        padding: 16,
        borderRadius: 12,
    },
});
