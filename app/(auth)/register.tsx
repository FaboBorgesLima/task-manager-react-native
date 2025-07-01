import { Card } from "@/components/Card";
import getFormStyleSheet from "@/style/getFormStyleSheet";
import { MockEmailValidation } from "@/services/mock-register.validation";
import { useAuthRepository } from "@/store/repositories/auth.repository";
import { useAuthStore } from "@/store/auth.store";
import { Ionicons } from "@expo/vector-icons";
import { AuthService } from "@faboborgeslima/task-manager-domain/dist/auth";
import { User } from "@faboborgeslima/task-manager-domain/dist/user";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useColors } from "@/store/colors";
import { Typo } from "@/constants/typo";
import { useEmailValidation } from "@/store/register.validation";

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();
    const authStore = useAuthStore();
    const authRepository = useAuthRepository((state) => state.repository);
    const palette = useColors((state) => state.palette);
    const formStyleSheet = getFormStyleSheet(palette);
    const emailValidationService = useEmailValidation(
        (state) => state.emailValidationService
    );

    const authService = new AuthService(authRepository, emailValidationService);

    const handleRegister = async () => {
        try {
            const user = new User({
                email,

                name,
            });
            const auth = await authService.register(
                user,
                {
                    email,
                    password,
                },
                "mock"
            );

            authStore.setAuth(auth);
            router.replace("/(task)");
        } catch (error) {
            console.error("Error registering user:", error);
            // Handle error (e.g., show a message to the user)
        }
    };

    return (
        <View style={formStyleSheet.container}>
            <Text style={formStyleSheet.formText}>
                Please register to your account to continue. If you already have
                an account, please login.
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
                            fontSize: 32,
                            textTransform: "lowercase",
                            fontWeight: "bold",
                        }}
                    >
                        Register
                    </Text>
                </View>
                <View style={formStyleSheet.formBody}>
                    <TextInput
                        placeholder="name"
                        autoCapitalize="none"
                        onChangeText={setName}
                        style={formStyleSheet.formInput}
                    ></TextInput>
                    <TextInput
                        placeholder="email"
                        inputMode="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        onChangeText={setEmail}
                        style={formStyleSheet.formInput}
                    ></TextInput>
                    <TextInput
                        secureTextEntry
                        placeholder="password"
                        autoCapitalize="none"
                        onChangeText={setPassword}
                        style={formStyleSheet.formInput}
                    ></TextInput>

                    <Pressable
                        onPress={() => {
                            handleRegister();
                        }}
                        style={formStyleSheet.formButton}
                    >
                        <Text style={formStyleSheet.formButtonText}>
                            Register
                        </Text>
                    </Pressable>
                </View>
            </Card>
            <Link
                href="/(auth)/login"
                style={{
                    textAlign: "center",
                    color: palette.backgroundContrast,
                    fontSize: Typo.SMALL,
                }}
            >
                Already have an account? Login here.
            </Link>
        </View>
    );
}
