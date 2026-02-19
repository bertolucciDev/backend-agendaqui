export declare const Role: {
    readonly CLIENT: "CLIENT";
    readonly OWNER: "OWNER";
    readonly STAFF: "STAFF";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const SubscriptionStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly CANCELED: "CANCELED";
    readonly PAST_DUE: "PAST_DUE";
    readonly TRIALING: "TRIALING";
};
export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];
export declare const VerificationType: {
    readonly PASSWORD_RESET: "PASSWORD_RESET";
    readonly VERIFY_EMAIL: "VERIFY_EMAIL";
};
export type VerificationType = (typeof VerificationType)[keyof typeof VerificationType];
