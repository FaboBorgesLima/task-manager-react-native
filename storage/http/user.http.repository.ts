import {
    User,
    UserRepositoryInterface,
} from "@faboborgeslima/task-manager-domain/dist/user";
import { AxiosInstance } from "axios";
import { UserHttpProps } from "./@types/user-http-props";

export class UserHttpRepository implements UserRepositoryInterface {
    protected httpClient: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.httpClient = axiosInstance;
    }

    async findOne(id: string): Promise<User | void> {
        const response = await this.httpClient.get<UserHttpProps>(
            `/users/${id}`
        );

        return new User({
            ...response.data,
            ...{
                updatedAt: new Date(response.data.updatedAt),
                createdAt: new Date(response.data.createdAt),
            },
        });
    }

    saveOne(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    deleteOne(id: string): Promise<void> {
        return this.httpClient.delete(`/users/${id}`);
    }
}
