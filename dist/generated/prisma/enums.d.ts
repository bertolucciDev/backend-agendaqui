export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const VerificationType: {
    readonly RESET_PASSWORD: "RESET_PASSWORD";
    readonly VERIFY_EMAIL: "VERIFY_EMAIL";
};
export type VerificationType = (typeof VerificationType)[keyof typeof VerificationType];
