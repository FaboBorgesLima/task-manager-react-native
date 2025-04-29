import { View, Text, Image, StyleSheet } from "react-native";
import Card from "../Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon, IconProps } from "@expo/vector-icons/build/createIconSet";

export type PlayerCardProps = {
    name: string;
    nickname: string;
    imgUrl: string;
    hp: number;
    hpMax: number;
    mana: number;
    manaMax: number;
    level: number;
    role: string;
    playerClassIcon: keyof typeof MaterialCommunityIcons.glyphMap;
};

export default function PlayerCard(props: PlayerCardProps): JSX.Element {
    return (
        <View style={{ ...styles.container }}>
            <Image
                source={{ uri: props.imgUrl }}
                style={{ width: 100, height: 100 }}
            ></Image>
            <View style={styles.cardBody}>
                <Text style={styles.title}>{props.name}</Text>
                <View style={styles.nickAndClassContainer}>
                    <Text>{props.nickname}</Text>
                    <View style={styles.classContainer}>
                        <MaterialCommunityIcons
                            name={props.playerClassIcon}
                            size={24}
                            color="black"
                        />
                        <MaterialCommunityIcons
                            name={"upload"}
                            size={24}
                            color="black"
                        />
                    </View>
                </View>
                <View
                    style={{
                        ...styles.bar,
                    }}
                >
                    <View
                        style={{
                            ...styles.barFill,
                            backgroundColor: "#f00",
                            width: `${(props.hp / props.hpMax) * 100}%`,
                        }}
                    ></View>
                </View>
                <View
                    style={{
                        ...styles.bar,
                    }}
                >
                    <View
                        style={{
                            ...styles.barFill,
                            backgroundColor: "#0ef",
                            width: `${(props.mana / props.manaMax) * 100}%`,
                        }}
                    ></View>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsText}>Level {props.level}</Text>
                    <Text style={styles.detailsText}> {props.role}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 16,
        padding: 8,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#000",
    },
    nickAndClassContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    classContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
    },
    cardBody: {
        flex: 1,
        display: "flex",
    },
    bar: {
        height: 10,
        borderRadius: 5,
        marginTop: 8,
        width: "100%",
        overflow: "hidden",
        backgroundColor: "rgb(229 231 235)",
    },
    barFill: {
        height: "100%",
        borderRadius: 5,
    },
    detailsContainer: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    detailsText: {
        fontSize: 12,
        color: "rgb(107 114 128)",
        fontWeight: "bold",
    },
});
