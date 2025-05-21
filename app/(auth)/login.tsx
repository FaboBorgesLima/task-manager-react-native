import { Card } from "@/components/Card";
import { Typo } from "@/constants/typo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import getFormStyleSheet from "@/style/getFormStyleSheet";
import { AuthService } from "@faboborgeslima/task-manager-domain/dist/auth";
import { AuthAsyncRepository } from "@/storage/auth.async.repository";
import { MockRegisterValidation } from "@/services/mock-register.validation";
import { useAuthStore } from "@/store/auth.store";
import { useColors } from "@/store/colors";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authService = new AuthService(
        new AuthAsyncRepository(),
        new MockRegisterValidation()
    );
    const router = useRouter();
    const authStore = useAuthStore();
    const palette = useColors((state) => state.palette);
    const formStyleSheet = getFormStyleSheet(palette);

    const handleLogin = async () => {
        try {
            const auth = await authService.login({
                email,
                password,
            });
            authStore.setAuth(auth);
            router.replace("/(task)");
        } catch (error) {}
    };

    return (
        <View style={formStyleSheet.container}>
            <Text style={formStyleSheet.formText}>
                Please login to your account to continue. If you don't have an
                account, please register.
            </Text>
            <Card>
                <View style={formStyleSheet.formHeader}>
                    <Ionicons
                        name="person-outline"
                        size={32}
                        color={palette.secondaryContrast}
                    ></Ionicons>
                    <Text
                        style={{
                            color: palette.secondaryContrast,
                            fontSize: Typo.XLARGE,
                            textTransform: "lowercase",
                            fontWeight: "bold",
                        }}
                    >
                        Login
                    </Text>
                </View>
                <View style={formStyleSheet.formBody}>
                    <TextInput
                        placeholder="email"
                        onChangeText={(text) => setEmail(text)}
                        inputMode="email"
                        autoCapitalize="none"
                        autoComplete="email"
                    ></TextInput>
                    <TextInput
                        placeholder="password"
                        autoCapitalize="none"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    ></TextInput>
                    <Pressable
                        onPress={() => {
                            handleLogin();
                        }}
                        style={formStyleSheet.formButton}
                    >
                        <Text style={formStyleSheet.formButtonText}>Login</Text>
                    </Pressable>
                </View>
            </Card>
            <Link
                href="/(auth)/register"
                style={{
                    textAlign: "center",
                    color: palette.backgroundContrast,
                    fontSize: Typo.SMALL,
                }}
            >
                Don't have an account? Register here.
            </Link>
        </View>
    );
}
