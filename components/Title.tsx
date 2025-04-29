import { View, Text, StyleSheet, TextProps } from "react-native";
import React from "react";

export default function Title(props: TextProps) {
    return (
        <Text {...props} style={styles.title}>
            {props.children}
        </Text>
    );
}

const styles = StyleSheet.create({
    title: {
        color: "rgb(159 155 167)",
        textTransform: "uppercase",
        marginLeft: 8,
        marginTop: 8,
    },
});
