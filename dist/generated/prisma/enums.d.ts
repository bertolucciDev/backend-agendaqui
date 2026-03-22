export declare const PlatformRole: {
    readonly CLIENT: "CLIENT";
    readonly OWNER: "OWNER";
    readonly STAFF: "STAFF";
    readonly ADMIN: "ADMIN";
};
export type PlatformRole = (typeof PlatformRole)[keyof typeof PlatformRole];
export declare const LegalEntityType: {
    readonly CPF: "CPF";
    readonly CNPJ: "CNPJ";
};
export type LegalEntityType = (typeof LegalEntityType)[keyof typeof LegalEntityType];
export declare const CompanyRole: {
    readonly OWNER: "OWNER";
    readonly STAFF: "STAFF";
};
export type CompanyRole = (typeof CompanyRole)[keyof typeof CompanyRole];
export declare const BookingStatus: {
    readonly PENDING: "PENDING";
    readonly CONFIRMED: "CONFIRMED";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELED: "CANCELED";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export declare const BillingInterval: {
    readonly MONTH: "MONTH";
    readonly YEAR: "YEAR";
};
export type BillingInterval = (typeof BillingInterval)[keyof typeof BillingInterval];
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
