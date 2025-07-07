import { EmailValidationServiceInterface } from "@faboborgeslima/task-manager-domain/dist/auth";
import { AxiosInstance } from "axios";

export class EmailHttpValidationService
    implements EmailValidationServiceInterface
{
    constructor(private axiosInstance: AxiosInstance) {}
    sendValidation(email: string): Promise<void> {
        return this.axiosInstance.post("/auth/send-validation", { email });
    }
    checkValidation(email: string, validation: string): Promise<boolean> {
        return Promise.resolve(true);
    }
}
