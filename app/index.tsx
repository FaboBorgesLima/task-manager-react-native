import { useRouter } from "expo-router";

import Login from "./(auth)/login";
export default function App() {
    const router = useRouter();

    return <Login />;
}
