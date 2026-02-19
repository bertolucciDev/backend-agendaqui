"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.VerificationScalarFieldEnum = exports.EstablishmentScalarFieldEnum = exports.SubscriptionScalarFieldEnum = exports.PlanScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = require("@prisma/client/runtime/index-browser");
exports.Decimal = runtime.Decimal;
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
    Plan: 'Plan',
    Subscription: 'Subscription',
    Establishment: 'Establishment',
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
    cpf: 'cpf',
    cnpj: 'cnpj',
    password: 'password',
    role: 'role',
    isVerified: 'isVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PlanScalarFieldEnum = {
    id: 'id',
    name: 'name',
    price: 'price',
    maxEstablishments: 'maxEstablishments',
    maxStaffs: 'maxStaffs',
    maxServices: 'maxServices'
};
exports.SubscriptionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    planId: 'planId',
    status: 'status',
    currentPeriodEnd: 'currentPeriodEnd'
};
exports.EstablishmentScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    ownerId: 'ownerId',
    subscriptionId: 'subscriptionId',
    createdAt: 'createdAt'
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
//# sourceMappingURL=prismaNamespaceBrowser.js.map