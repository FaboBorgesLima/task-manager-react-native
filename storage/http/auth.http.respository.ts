import {
    Auth,
    AuthRepositoryInterface,
} from "@faboborgeslima/task-manager-domain/dist/auth";
import { AuthCredentials } from "@faboborgeslima/task-manager-domain/dist/auth/types";
import { User } from "@faboborgeslima/task-manager-domain/dist/user";
import axios, { AxiosInstance } from "axios";
import { UserHttpProps } from "./@types/user-http-props";

export class AuthHttpRepository implements AuthRepositoryInterface {
    public static readonly BASE_URL =
        "https://v1.task-manager-backend.nyxsystems.shop";
    private httpClient: AxiosInstance; // Replace with actual HTTP client type

    constructor(axiosInstance: AxiosInstance) {
        this.httpClient = axiosInstance;
    }

    async fromToken(token: string): Promise<Auth> {
        const response = await this.httpClient.get<{
            token: string;
            user: UserHttpProps;
        }>(`/auth/me`, { headers: { Authorization: `Bearer ${token}` } });

        return new Auth(
            response.data.token,
            new User({
                ...response.data.user,
                ...{
                    updatedAt: new Date(response.data.user.updatedAt),
                    createdAt: new Date(response.data.user.createdAt),
                },
            })
        );
    }
    async fromUser(user: User): Promise<Auth> {
        const response = await this.httpClient.get<UserHttpProps>(
            `/users/${user.id}`
        );

        return new Auth(
            this.httpClient.defaults.headers.common[
                "Authorization"
            ]?.toString() || "",
            new User({
                ...response.data,
                ...{
                    updatedAt: new Date(response.data.updatedAt),
                    createdAt: new Date(response.data.createdAt),
                },
            })
        );
    }
    async login(credentials: AuthCredentials): Promise<Auth> {
        const response = await this.httpClient.post<{
            token: string;
            user: UserHttpProps;
        }>("/auth/login", credentials);

        return new Auth(
            response.data.token,
            new User({
                ...response.data.user,
                ...{
                    updatedAt: new Date(response.data.user.updatedAt),
                    createdAt: new Date(response.data.user.createdAt),
                },
            })
        );
    }
    async register(user: User, credentials: AuthCredentials): Promise<Auth> {
        const response = await this.httpClient.post<{
            token: string;
            user: UserHttpProps;
        }>("/auth/register", {
            name: user.name,
            email: user.email,
            password: credentials.password,
            validation: credentials.email, // workaround for email validation using credentials
        });

        return new Auth(
            response.data.token,
            new User({
                ...response.data.user,
                ...{
                    updatedAt: new Date(response.data.user.updatedAt),
                    createdAt: new Date(response.data.user.createdAt),
                },
            })
        );
    }
}
