import { getColors } from "@/style/getColors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Typo } from "@/constants/typo";
import { Rem } from "@/constants/rem";
import { useColors } from "@/store/colors";

export default function Header(props: NativeStackHeaderProps) {
    const palette = useColors((state) => state.palette);

    return (
        <View
            style={[
                styleSheet.container,
                { backgroundColor: palette.secondary },
            ]}
        >
            <Ionicons
                name="moon-outline"
                size={Rem.XLARGE}
                color={palette.secondaryContrast}
            ></Ionicons>
            <Text
                style={{ ...styleSheet.text, color: palette.secondaryContrast }}
            >
                Task Manager
            </Text>
        </View>
    );
}

const styleSheet = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: Rem.MEDIUM,
        gap: Rem.MEDIUM,
    },
    text: {
        fontSize: Typo.XLARGE,
        textTransform: "lowercase",
        fontWeight: "bold",
    },
});
