import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client/runtime/client").DbNullClass;
export declare const JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
export declare const AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Business: "Business";
    readonly Membership: "Membership";
    readonly Location: "Location";
    readonly Service: "Service";
    readonly Discount: "Discount";
    readonly Booking: "Booking";
    readonly DiscountUsage: "DiscountUsage";
    readonly Plan: "Plan";
    readonly Price: "Price";
    readonly Subscription: "Subscription";
    readonly Verification: "Verification";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly phone: "phone";
    readonly passwordHash: "passwordHash";
    readonly isVerified: "isVerified";
    readonly profileCompleted: "profileCompleted";
    readonly role: "role";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const BusinessScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly document: "document";
    readonly documentType: "documentType";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BusinessScalarFieldEnum = (typeof BusinessScalarFieldEnum)[keyof typeof BusinessScalarFieldEnum];
export declare const MembershipScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly businessId: "businessId";
    readonly role: "role";
};
export type MembershipScalarFieldEnum = (typeof MembershipScalarFieldEnum)[keyof typeof MembershipScalarFieldEnum];
export declare const LocationScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly isActive: "isActive";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly address: "address";
    readonly businessId: "businessId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum];
export declare const ServiceScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly basePrice: "basePrice";
    readonly durationMinutes: "durationMinutes";
    readonly isActive: "isActive";
    readonly locationId: "locationId";
};
export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum];
export declare const DiscountScalarFieldEnum: {
    readonly id: "id";
    readonly locationId: "locationId";
    readonly serviceId: "serviceId";
    readonly percentage: "percentage";
    readonly fixedAmount: "fixedAmount";
    readonly maxUses: "maxUses";
    readonly isExclusive: "isExclusive";
    readonly isActive: "isActive";
    readonly startAt: "startAt";
    readonly endAt: "endAt";
};
export type DiscountScalarFieldEnum = (typeof DiscountScalarFieldEnum)[keyof typeof DiscountScalarFieldEnum];
export declare const BookingScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly locationId: "locationId";
    readonly serviceId: "serviceId";
    readonly discountId: "discountId";
    readonly basePrice: "basePrice";
    readonly discountAmount: "discountAmount";
    readonly finalPrice: "finalPrice";
    readonly status: "status";
    readonly scheduledAt: "scheduledAt";
    readonly createdAt: "createdAt";
};
export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum];
export declare const DiscountUsageScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly subscriptionId: "subscriptionId";
    readonly bookingId: "bookingId";
    readonly createdAt: "createdAt";
};
export type DiscountUsageScalarFieldEnum = (typeof DiscountUsageScalarFieldEnum)[keyof typeof DiscountUsageScalarFieldEnum];
export declare const PlanScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly discountLimit: "discountLimit";
    readonly hasUnlimitedUsage: "hasUnlimitedUsage";
    readonly trialDays: "trialDays";
    readonly isActive: "isActive";
};
export type PlanScalarFieldEnum = (typeof PlanScalarFieldEnum)[keyof typeof PlanScalarFieldEnum];
export declare const PriceScalarFieldEnum: {
    readonly id: "id";
    readonly planId: "planId";
    readonly amount: "amount";
    readonly currency: "currency";
    readonly interval: "interval";
    readonly intervalCount: "intervalCount";
    readonly isActive: "isActive";
};
export type PriceScalarFieldEnum = (typeof PriceScalarFieldEnum)[keyof typeof PriceScalarFieldEnum];
export declare const SubscriptionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly planId: "planId";
    readonly priceId: "priceId";
    readonly externalId: "externalId";
    readonly status: "status";
    readonly currentPeriodStart: "currentPeriodStart";
    readonly currentPeriodEnd: "currentPeriodEnd";
    readonly trialEnd: "trialEnd";
    readonly canceledAt: "canceledAt";
    readonly endedAt: "endedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum];
export declare const VerificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly token: "token";
    readonly code: "code";
    readonly type: "type";
    readonly expiresAt: "expiresAt";
    readonly isUsed: "isUsed";
    readonly createdAt: "createdAt";
    readonly usedAt: "usedAt";
};
export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
