import { Card } from "@/components/Card";
import getFormStyleSheet from "@/style/getFormStyleSheet";
import { MockRegisterValidation } from "@/services/mock-register.validation";
import { useAuthRepository } from "@/store/repositories/auth.repository";
import { useAuthStore } from "@/store/auth.store";
import { Ionicons } from "@expo/vector-icons";
import { AuthService } from "@faboborgeslima/task-manager-domain/dist/auth";
import { User } from "@faboborgeslima/task-manager-domain/dist/user";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useColors } from "@/store/colors";

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();
    const authStore = useAuthStore();
    const authRepository = useAuthRepository((state) => state.repository);
    const palette = useColors((state) => state.palette);
    const formStyleSheet = getFormStyleSheet(palette);

    const handleRegister = async () => {
        const authService = new AuthService(
            authRepository,
            new MockRegisterValidation()
        );

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
            console.error(error);
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
                    ></TextInput>
                    <TextInput
                        placeholder="email"
                        inputMode="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        onChangeText={setEmail}
                    ></TextInput>
                    <TextInput
                        secureTextEntry
                        placeholder="password"
                        autoCapitalize="none"
                        onChangeText={setPassword}
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
        </View>
    );
}
