import Header from "@/components/Header";
import { AuthHttpRepository } from "@/storage/http/auth.http.respository";
import { TaskHttpRespository } from "@/storage/http/task.http.respository";
import { UserHttpRepository } from "@/storage/http/user.http.repository";
import { useAxiosStore } from "@/store/axios.store";
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

        setTaskRepository(new TaskHttpRespository(newInstance));
        setUserRepository(new UserHttpRepository(newInstance));
        setAuthRepository(new AuthHttpRepository(newInstance));
    }, [axiosInstance, process.env.EXPO_PUBLIC_API_URL]);

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
