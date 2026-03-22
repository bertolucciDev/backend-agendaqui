"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.VerificationScalarFieldEnum = exports.SubscriptionScalarFieldEnum = exports.PriceScalarFieldEnum = exports.PlanScalarFieldEnum = exports.DiscountUsageScalarFieldEnum = exports.BookingScalarFieldEnum = exports.DiscountScalarFieldEnum = exports.ServiceScalarFieldEnum = exports.LocationScalarFieldEnum = exports.MembershipScalarFieldEnum = exports.BusinessScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = require("@prisma/client/runtime/client");
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.5.0",
    engine: "280c870be64f457428992c43c1f6d557fab6e29e"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Business: 'Business',
    Membership: 'Membership',
    Location: 'Location',
    Service: 'Service',
    Discount: 'Discount',
    Booking: 'Booking',
    DiscountUsage: 'DiscountUsage',
    Plan: 'Plan',
    Price: 'Price',
    Subscription: 'Subscription',
    Verification: 'Verification'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    passwordHash: 'passwordHash',
    isVerified: 'isVerified',
    profileCompleted: 'profileCompleted',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
exports.BusinessScalarFieldEnum = {
    id: 'id',
    name: 'name',
    document: 'document',
    documentType: 'documentType',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.MembershipScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    businessId: 'businessId',
    role: 'role'
};
exports.LocationScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    isActive: 'isActive',
    latitude: 'latitude',
    longitude: 'longitude',
    address: 'address',
    businessId: 'businessId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ServiceScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    basePrice: 'basePrice',
    durationMinutes: 'durationMinutes',
    isActive: 'isActive',
    locationId: 'locationId'
};
exports.DiscountScalarFieldEnum = {
    id: 'id',
    locationId: 'locationId',
    serviceId: 'serviceId',
    percentage: 'percentage',
    fixedAmount: 'fixedAmount',
    maxUses: 'maxUses',
    isExclusive: 'isExclusive',
    isActive: 'isActive',
    startAt: 'startAt',
    endAt: 'endAt'
};
exports.BookingScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    locationId: 'locationId',
    serviceId: 'serviceId',
    discountId: 'discountId',
    basePrice: 'basePrice',
    discountAmount: 'discountAmount',
    finalPrice: 'finalPrice',
    status: 'status',
    scheduledAt: 'scheduledAt',
    createdAt: 'createdAt'
};
exports.DiscountUsageScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    subscriptionId: 'subscriptionId',
    bookingId: 'bookingId',
    createdAt: 'createdAt'
};
exports.PlanScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    discountLimit: 'discountLimit',
    hasUnlimitedUsage: 'hasUnlimitedUsage',
    trialDays: 'trialDays',
    isActive: 'isActive'
};
exports.PriceScalarFieldEnum = {
    id: 'id',
    planId: 'planId',
    amount: 'amount',
    currency: 'currency',
    interval: 'interval',
    intervalCount: 'intervalCount',
    isActive: 'isActive'
};
exports.SubscriptionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    planId: 'planId',
    priceId: 'priceId',
    externalId: 'externalId',
    status: 'status',
    currentPeriodStart: 'currentPeriodStart',
    currentPeriodEnd: 'currentPeriodEnd',
    trialEnd: 'trialEnd',
    canceledAt: 'canceledAt',
    endedAt: 'endedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.VerificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    token: 'token',
    code: 'code',
    type: 'type',
    expiresAt: 'expiresAt',
    isUsed: 'isUsed',
    createdAt: 'createdAt',
    usedAt: 'usedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map