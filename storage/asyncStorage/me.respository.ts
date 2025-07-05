import { Auth } from "@faboborgeslima/task-manager-domain/dist/auth";
import { User } from "@faboborgeslima/task-manager-domain/dist/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthProps = {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        createdAt: string;
        updatedAt: string;
    };
};

export class MeRepository {
    private readonly KEY = "me";
    async getMe(): Promise<Auth | void> {
        const userData = await AsyncStorage.getItem(this.KEY);
        if (!userData) return;
        const authData: AuthProps = JSON.parse(userData);
        return new Auth(
            authData.token,
            new User({
                ...authData.user,
                createdAt: new Date(authData.user.createdAt),
                updatedAt: new Date(authData.user.updatedAt),
            })
        );
    }

    async setMe(auth: Auth): Promise<void> {
        await AsyncStorage.setItem(
            this.KEY,
            JSON.stringify(this.toProps(auth))
        );
    }

    private toProps(auth: Auth): AuthProps {
        if (!auth.user.id) {
            throw new Error("User ID is required to set Me");
        }

        return {
            token: auth.token,
            user: {
                id: auth.user.id,
                name: auth.user.name,
                email: auth.user.email,
                createdAt: auth.user.createdAt.toISOString(),
                updatedAt: auth.user.updatedAt.toISOString(),
            },
        };
    }

    async clearMe(): Promise<void> {
        await AsyncStorage.removeItem(this.KEY);
    }
}
