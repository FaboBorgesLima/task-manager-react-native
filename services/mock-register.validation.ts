import { EmailValidationServiceInterface } from "@faboborgeslima/task-manager-domain/dist/auth";
import { User } from "@faboborgeslima/task-manager-domain/dist/user";

export class MockEmailValidation implements EmailValidationServiceInterface {
    sendValidation(email: string): Promise<void> {
        return Promise.resolve();
    }

    checkValidation(validation: string): Promise<boolean> {
        return Promise.resolve(true);
    }
}
