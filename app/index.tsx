import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function () {
    return (
        <View>
            <Text>Hello World</Text>
            <Link
                href="/(tabs)/test"
                style={{
                    marginTop: 20,
                    paddingVertical: 15,
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        color: "#2e78b7",
                    }}
                >
                    Go to Test Component
                </Text>
            </Link>
            <Link
                href={`/(user)/${Math.floor(Math.random() * 100)}`}
                style={{
                    marginTop: 20,
                    paddingVertical: 15,
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        color: "#2e78b7",
                    }}
                >
                    Go to User
                </Text>
            </Link>
        </View>
    );
}
