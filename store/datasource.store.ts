import { AuthStorage } from "@/storage/auth.storage";
import { RegisterValidation } from "@/storage/register.validation";
import { TaskStorage } from "@/storage/task.storage";
import { UserStorage } from "@/storage/user.storage";
import { create } from "zustand";

export const useDatasource = create<{
    auth: AuthStorage;
    user: UserStorage;
    registerValidation: RegisterValidation;
    task: TaskStorage;
}>((set) => ({
    auth: new AuthStorage(),
    user: new UserStorage(),
    task: new TaskStorage(),
    registerValidation: new RegisterValidation(),
}));
