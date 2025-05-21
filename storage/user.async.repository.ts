import {
    User,
    UserRepositoryInterface,
} from "@faboborgeslima/task-manager-domain/dist/user";
import { UserProps } from "@faboborgeslima/task-manager-domain/dist/user/types/user-props";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export class UserAsyncRepository implements UserRepositoryInterface {
    async findOne(id: string): Promise<User | void> {
        const users = await this.getUsers();
        const user = users.find((u) => u.id === id);
        return Promise.resolve(user || undefined);
    }

    async getUsers(): Promise<User[]> {
        const users = await AsyncStorage.getItem("users");

        if (!users) {
            return [];
        }

        return (JSON.parse(users) as UserProps[]).map((user) => new User(user));
    }

    async setUsers(users: User[]): Promise<void> {
        await AsyncStorage.setItem(
            "users",
            JSON.stringify(users.map((user) => user.getProps()))
        );
    }

    async saveOne(user: User): Promise<User> {
        const users = await this.getUsers();

        const userIndex = users.findIndex((u) => u.id === user.id);

        if (userIndex !== -1) {
            users[userIndex] = user;
        } else {
            user.id = (Math.random() * 1_000_000).toString(36);
            users.push(user);
        }

        await this.setUsers(users);

        return Promise.resolve(user);
    }

    async deleteOne(id: string): Promise<void> {
        const users = await this.getUsers();
        const userIndex = users.findIndex((u) => u.id === id);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            await this.setUsers(users);
        }
        return Promise.resolve();
    }
}

export const useUserAsyncRepository = create<{
    userAsyncRepository: UserAsyncRepository;
    setUserAsyncRepository: (userAsyncRepository: UserAsyncRepository) => void;
}>((set) => ({
    userAsyncRepository: new UserAsyncRepository(),
    setUserAsyncRepository: (userAsyncRepository) =>
        set({ userAsyncRepository }),
}));
