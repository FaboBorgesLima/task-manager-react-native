import {
    Auth,
    AuthRepositoryInterface,
} from "@faboborgeslima/task-manager-domain/dist/auth/";
import { AuthCredentials } from "@faboborgeslima/task-manager-domain/dist/auth/types";
import { User } from "@faboborgeslima/task-manager-domain/dist/user";
import { UserStorage } from "./user.storage";
export class AuthStorage implements AuthRepositoryInterface {
    public static auths: Auth[] = [];
    public static auth: Auth | null = null;
    public static userStorage: UserStorage = new UserStorage();
    constructor() {}
    fromToken(token: string): Promise<Auth> {
        const auth = AuthStorage.auths.find((a) => a.token === token);
        if (!auth) {
            return Promise.reject(new Error("Auth not found"));
        }
        return Promise.resolve(auth);
    }
    fromUser(user: User): Promise<Auth> {
        const auth = AuthStorage.auths.find((a) => a.user.id === user.id);
        if (!auth) {
            return Promise.reject(new Error("Auth not found"));
        }
        return Promise.resolve(auth);
    }
    async login(credentials: AuthCredentials): Promise<Auth> {
        const user = UserStorage.users.find(
            (u) => u.email === credentials.email
        );
        if (!user) {
            return Promise.reject(new Error("User not found"));
        }

        return await this.fromUser(user);
    }

    register(user: User, credentials: AuthCredentials): Promise<Auth> {
        const auth = new Auth((Math.random() * 1_000_000).toString(36), user);
        auth.user = user;
        auth.token = (Math.random() * 1_000_000).toString(36);
        AuthStorage.auths.push(auth);
        return Promise.resolve(auth);
    }

    setMe(auth: Auth): Promise<void> {
        AuthStorage.auth = auth;
        return Promise.resolve();
    }

    getMe(): Promise<Auth | null> {
        return Promise.resolve(AuthStorage.auth);
    }
}
