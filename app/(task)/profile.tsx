import { Rem } from "@/constants/rem";
import { Typo } from "@/constants/typo";
import { MeRepository } from "@/storage/asyncStorage/me.respository";
import { useAuthStore } from "@/store/auth.store";
import { useColors } from "@/store/colors";
import { useUserRepository } from "@/store/repositories/user.repository";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View, Alert } from "react-native";

export default function Profile() {
    const meRepository = new MeRepository();
    const { auth, setAuth, clearAuth } = useAuthStore();
    const userRepository = useUserRepository((state) => state.repository);
    const router = useRouter();
    const palette = useColors((state) => state.palette);

    useEffect(() => {
        async function initMe() {
            const me = await meRepository.getMe();
            if (me) {
                return;
            }
            router.replace("../");
        }
        initMe();
    }, []);

    async function handleLogout() {
        try {
            await meRepository.clearMe();
            setAuth(null);
            clearAuth();
            router.replace("/(auth)/login");
        } catch (error) {
            console.error("Failed to clear user data:", error);
        }
    }

    async function handleDeleteAccount() {
        Alert.alert(
            "Confirm Account Deletion",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: deleteAccount,
                },
            ]
        );
    }

    async function deleteAccount() {
        try {
            await userRepository.deleteOne(auth?.user.id || "");
            setAuth(null);
            clearAuth();
            router.replace("/(auth)/login");
        } catch (error) {
            console.error("Failed to delete user account:", error);
        }
    }

    return (
        <>
            <View
                style={{
                    ...styleSheet.container,
                    backgroundColor: palette.background,
                }}
            >
                <View
                    style={{
                        ...styleSheet.userInfoContainer,
                        backgroundColor: palette.primaryContrast,
                    }}
                >
                    <Text style={styleSheet.title}>{auth?.user.name}</Text>
                    <Ionicons
                        name="person"
                        size={Rem.XLARGE}
                        color={palette.primary}
                    />
                </View>
                <View style={styleSheet.buttons}>
                    <Pressable
                        onPress={handleDeleteAccount}
                        style={{
                            ...styleSheet.logoutButton,
                            backgroundColor: palette.error,
                        }}
                    >
                        <Ionicons
                            name="trash"
                            size={Rem.XLARGE}
                            color={palette.errorContrast}
                        />
                        <Text
                            style={{
                                ...styleSheet.logoutButtonText,
                                color: palette.errorContrast,
                            }}
                        >
                            Delete Account
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={handleLogout}
                        style={{
                            ...styleSheet.logoutButton,
                            backgroundColor: palette.error,
                        }}
                    >
                        <Ionicons
                            name="log-out"
                            size={Rem.XLARGE}
                            color={palette.errorContrast}
                        />
                        <Text
                            style={{
                                ...styleSheet.logoutButtonText,
                                color: palette.errorContrast,
                            }}
                        >
                            Logout
                        </Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
}
const styleSheet = StyleSheet.create({
    container: {
        flex: 1,
        padding: Rem.LARGE,
        gap: Rem.LARGE,
    },
    title: {
        fontSize: Typo.LARGE,
        fontWeight: "bold",
        textAlign: "center",
    },
    buttons: {
        flexDirection: "row",
        gap: Rem.LARGE,
        justifyContent: "space-between",
    },
    logoutButton: {
        padding: Rem.SMALL,
        borderRadius: Rem.LARGE,
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    logoutButtonText: {
        fontSize: Typo.MEDIUM,
        textAlign: "center",
    },
    userInfoContainer: {
        marginTop: Rem.MEDIUM,
        padding: Rem.MEDIUM,
        borderRadius: Rem.LARGE,
        alignItems: "center",
        justifyContent: "center",
    },
});
