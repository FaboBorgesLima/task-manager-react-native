import { RegisterValidationInterface } from "@faboborgeslima/task-manager-domain/dist/auth";
import { User } from "@faboborgeslima/task-manager-domain/dist/user";

export class RegisterValidation implements RegisterValidationInterface {
    sendValidation(user: User): Promise<string> {
        return Promise.resolve("123456");
    }

    checkValidation(validation: string): Promise<boolean> {
        return Promise.resolve(true);
    }
}
