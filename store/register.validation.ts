import { create } from "zustand";
import { EmailValidationServiceInterface } from "@faboborgeslima/task-manager-domain/dist/auth/email-validation.service.interface";
import { MockEmailValidation } from "@/services/mock-register.validation";

export const useEmailValidation = create<{
    emailValidationService: EmailValidationServiceInterface;
    setEmailValidationService: (
        service: EmailValidationServiceInterface
    ) => void;
}>((set) => ({
    emailValidationService: new MockEmailValidation(),
    setEmailValidationService: (service: EmailValidationServiceInterface) =>
        set({ emailValidationService: service }),
}));
