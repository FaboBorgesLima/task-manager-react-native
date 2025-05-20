import {
    User,
    UserRepositoryInterface,
} from "@faboborgeslima/task-manager-domain/dist/user";

export class UserStorage implements UserRepositoryInterface {
    public static users: User[] = [];
    findOne(id: string): Promise<User | void> {
        const user = UserStorage.users.find((u) => u.id === id);
        return Promise.resolve(user || undefined);
    }
    saveOne(user: User): Promise<User> {
        const userIndex = UserStorage.users.findIndex((u) => u.id === user.id);
        if (userIndex !== -1) {
            UserStorage.users[userIndex] = user;
        } else {
            user.id = (Math.random() * 1_000_000).toString(36);
            UserStorage.users.push(user);
        }
        return Promise.resolve(user);
    }
    deleteOne(id: string): Promise<void> {
        const userIndex = UserStorage.users.findIndex((u) => u.id === id);
        if (userIndex !== -1) {
            UserStorage.users.splice(userIndex, 1);
        }
        return Promise.resolve();
    }
}
