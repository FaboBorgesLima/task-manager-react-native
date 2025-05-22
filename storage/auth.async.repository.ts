import {
    Auth,
    AuthRepositoryInterface,
} from "@faboborgeslima/task-manager-domain/dist/auth/";
import { AuthCredentials } from "@faboborgeslima/task-manager-domain/dist/auth/types";
import { User } from "@faboborgeslima/task-manager-domain/dist/user";
import { UserAsyncRepository } from "./user.async.repository";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProps } from "@faboborgeslima/task-manager-domain/dist/user/types/user-props";
import { randomUUID } from "expo-crypto";

export class AuthAsyncRepository implements AuthRepositoryInterface {
    constructor() {}

    private async getAuths(): Promise<Auth[]> {
        const authsJson = await AsyncStorage.getItem("auths");

        return authsJson
            ? (
                  JSON.parse(authsJson) as { token: string; user: UserProps }[]
              ).map(
                  (authData) =>
                      new Auth(authData.token, new User(authData.user))
              )
            : [];
    }

    private async setAuths(auths: Auth[]): Promise<void> {
        await AsyncStorage.setItem(
            "auths",
            JSON.stringify(
                auths.map((auth) => ({
                    token: auth.token,
                    user: auth.user.getProps(),
                }))
            )
        );
    }

    async fromToken(token: string): Promise<Auth> {
        const auths = await this.getAuths();
        const auth = auths.find((a) => a.token === token);
        if (!auth) {
            return Promise.reject(new Error("Auth not found"));
        }

        return auth;
    }

    async fromUser(user: User): Promise<Auth> {
        const auths = await this.getAuths();
        const auth = auths.find((a) => a.user.id === user.id);

        if (!auth) {
            return Promise.reject(new Error("Auth not found"));
        }

        return auth;
    }

    async login(credentials: AuthCredentials): Promise<Auth> {
        const userStorage = new UserAsyncRepository();
        const users = await userStorage.getUsers();
        const user = users.find((u) => u.email === credentials.email);

        if (!user) {
            return Promise.reject(new Error("User not found"));
        }

        const auths = await this.getAuths();
        const auth = new Auth(randomUUID(), user);
        auth.user = user;
        auth.token = randomUUID();

        auths.push(auth);

        await this.setAuths(auths);

        return auth;
    }

    async register(user: User, credentials: AuthCredentials): Promise<Auth> {
        const userStorage = new UserAsyncRepository();
        let registerUser = await userStorage.saveOne(user);
        const auths = await this.getAuths();

        const auth = new Auth(randomUUID(), registerUser);

        auths.push(auth);

        await this.setAuths(auths);

        return auth;
    }
}
