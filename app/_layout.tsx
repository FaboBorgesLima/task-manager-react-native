import Header from "@/components/Header";
import { EmailHttpValidationService } from "@/services/email-http-validation";
import { MeRepository } from "@/storage/asyncStorage/me.respository";
import { AuthHttpRepository } from "@/storage/http/auth.http.respository";
import { TaskHttpRespository } from "@/storage/http/task.http.respository";
import { UserHttpRepository } from "@/storage/http/user.http.repository";
import { useAuthStore } from "@/store/auth.store";
import { useAxiosStore } from "@/store/axios.store";
import { useEmailValidation } from "@/store/register.validation";
import { useAuthRepository } from "@/store/repositories/auth.repository";
import { useTaskRepository } from "@/store/repositories/task.repository";
import { useUserRepository } from "@/store/repositories/user.repository";
import axios from "axios";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
    const axiosInstance = useAxiosStore((state) => state.axiosInstance);
    const setAxiosInstance = useAxiosStore((state) => state.setAxiosInstance);
    const setTaskRepository = useTaskRepository((state) => state.setRepository);
    const setUserRepository = useUserRepository((state) => state.setRepository);
    const setAuthRepository = useAuthRepository((state) => state.setRepository);
    const setValidationService = useEmailValidation(
        (state) => state.setEmailValidationService
    );

    const meRepository = new MeRepository();
    const { auth, setAuth } = useAuthStore();

    useEffect(() => {
        console.debug(
            "Initializing Axios instance with base URL:",
            process.env.EXPO_PUBLIC_API_URL,
            axiosInstance
        );

        if (axiosInstance?.getUri() === process.env.EXPO_PUBLIC_API_URL) {
            return;
        }

        console.debug(
            "Creating new Axios instance with base URL:",
            process.env.EXPO_PUBLIC_API_URL
        );
        const newInstance = axios.create({
            baseURL: process.env.EXPO_PUBLIC_API_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        setAxiosInstance(newInstance);

        async function initMe() {
            const me = await meRepository.getMe();
            if (me) {
                console.debug(
                    "Setting authenticated user from MeRepository:",
                    me
                );
                setAuth(me);
            }
        }

        initMe();
    }, []);

    useEffect(() => {
        if (!axiosInstance) {
            console.warn("Axios instance is not initialized.");
            return;
        }
        console.debug(
            "Setting repositories with Axios instance:",
            axiosInstance
        );
        setTaskRepository(new TaskHttpRespository(axiosInstance));
        setUserRepository(new UserHttpRepository(axiosInstance));
        setAuthRepository(new AuthHttpRepository(axiosInstance));
        setValidationService(new EmailHttpValidationService(axiosInstance));
    }, [axiosInstance]);

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: (props) => <Header {...props} />,
                title: "Task Manager",
            }}
            initialRouteName="(auth)/login"
        ></Stack>
    );
}
