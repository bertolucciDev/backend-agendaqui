"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationType = exports.SubscriptionStatus = exports.BillingInterval = exports.BookingStatus = exports.CompanyRole = exports.LegalEntityType = exports.PlatformRole = void 0;
exports.PlatformRole = {
    CLIENT: 'CLIENT',
    OWNER: 'OWNER',
    STAFF: 'STAFF',
    ADMIN: 'ADMIN'
};
exports.LegalEntityType = {
    CPF: 'CPF',
    CNPJ: 'CNPJ'
};
exports.CompanyRole = {
    OWNER: 'OWNER',
    STAFF: 'STAFF'
};
exports.BookingStatus = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED'
};
exports.BillingInterval = {
    MONTH: 'MONTH',
    YEAR: 'YEAR'
};
exports.SubscriptionStatus = {
    ACTIVE: 'ACTIVE',
    CANCELED: 'CANCELED',
    PAST_DUE: 'PAST_DUE',
    TRIALING: 'TRIALING'
};
exports.VerificationType = {
    PASSWORD_RESET: 'PASSWORD_RESET',
    VERIFY_EMAIL: 'VERIFY_EMAIL'
};
//# sourceMappingURL=enums.js.map