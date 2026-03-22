import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
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
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "business" | "membership" | "location" | "service" | "discount" | "booking" | "discountUsage" | "plan" | "price" | "subscription" | "verification";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Business: {
            payload: Prisma.$BusinessPayload<ExtArgs>;
            fields: Prisma.BusinessFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BusinessFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BusinessFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>;
                };
                findFirst: {
                    args: Prisma.BusinessFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BusinessFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>;
                };
                findMany: {
                    args: Prisma.BusinessFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>[];
                };
                create: {
                    args: Prisma.BusinessCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>;
                };
                createMany: {
                    args: Prisma.BusinessCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BusinessCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>[];
                };
                delete: {
                    args: Prisma.BusinessDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>;
                };
                update: {
                    args: Prisma.BusinessUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>;
                };
                deleteMany: {
                    args: Prisma.BusinessDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BusinessUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BusinessUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>[];
                };
                upsert: {
                    args: Prisma.BusinessUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BusinessPayload>;
                };
                aggregate: {
                    args: Prisma.BusinessAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBusiness>;
                };
                groupBy: {
                    args: Prisma.BusinessGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BusinessGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BusinessCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BusinessCountAggregateOutputType> | number;
                };
            };
        };
        Membership: {
            payload: Prisma.$MembershipPayload<ExtArgs>;
            fields: Prisma.MembershipFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MembershipFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MembershipFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                findFirst: {
                    args: Prisma.MembershipFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MembershipFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                findMany: {
                    args: Prisma.MembershipFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>[];
                };
                create: {
                    args: Prisma.MembershipCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                createMany: {
                    args: Prisma.MembershipCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MembershipCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>[];
                };
                delete: {
                    args: Prisma.MembershipDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                update: {
                    args: Prisma.MembershipUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                deleteMany: {
                    args: Prisma.MembershipDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MembershipUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MembershipUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>[];
                };
                upsert: {
                    args: Prisma.MembershipUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MembershipPayload>;
                };
                aggregate: {
                    args: Prisma.MembershipAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMembership>;
                };
                groupBy: {
                    args: Prisma.MembershipGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MembershipGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MembershipCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MembershipCountAggregateOutputType> | number;
                };
            };
        };
        Location: {
            payload: Prisma.$LocationPayload<ExtArgs>;
            fields: Prisma.LocationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LocationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                findFirst: {
                    args: Prisma.LocationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                findMany: {
                    args: Prisma.LocationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>[];
                };
                create: {
                    args: Prisma.LocationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                createMany: {
                    args: Prisma.LocationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>[];
                };
                delete: {
                    args: Prisma.LocationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                update: {
                    args: Prisma.LocationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                deleteMany: {
                    args: Prisma.LocationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LocationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>[];
                };
                upsert: {
                    args: Prisma.LocationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                aggregate: {
                    args: Prisma.LocationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLocation>;
                };
                groupBy: {
                    args: Prisma.LocationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LocationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LocationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LocationCountAggregateOutputType> | number;
                };
            };
        };
        Service: {
            payload: Prisma.$ServicePayload<ExtArgs>;
            fields: Prisma.ServiceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ServiceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                findFirst: {
                    args: Prisma.ServiceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                findMany: {
                    args: Prisma.ServiceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>[];
                };
                create: {
                    args: Prisma.ServiceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                createMany: {
                    args: Prisma.ServiceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>[];
                };
                delete: {
                    args: Prisma.ServiceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                update: {
                    args: Prisma.ServiceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                deleteMany: {
                    args: Prisma.ServiceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ServiceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>[];
                };
                upsert: {
                    args: Prisma.ServiceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                aggregate: {
                    args: Prisma.ServiceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateService>;
                };
                groupBy: {
                    args: Prisma.ServiceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ServiceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ServiceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ServiceCountAggregateOutputType> | number;
                };
            };
        };
        Discount: {
            payload: Prisma.$DiscountPayload<ExtArgs>;
            fields: Prisma.DiscountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DiscountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DiscountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountPayload>;
                };
                findFirst: {
                    args: Prisma.DiscountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DiscountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountPayload>;
                };
                findMany: {
                    args: Prisma.DiscountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountPayload>[];
                };
                create: {
                    args: Prisma.DiscountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountPayload>;
                };
                createMany: {
                    args: Prisma.DiscountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DiscountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountPayload>[];
                };
                delete: {
                    args: Prisma.DiscountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountPayload>;
                };
                update: {
                    args: Prisma.DiscountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountPayload>;
                };
                deleteMany: {
                    args: Prisma.DiscountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DiscountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DiscountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountPayload>[];
                };
                upsert: {
                    args: Prisma.DiscountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountPayload>;
                };
                aggregate: {
                    args: Prisma.DiscountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDiscount>;
                };
                groupBy: {
                    args: Prisma.DiscountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiscountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DiscountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiscountCountAggregateOutputType> | number;
                };
            };
        };
        Booking: {
            payload: Prisma.$BookingPayload<ExtArgs>;
            fields: Prisma.BookingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BookingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                findFirst: {
                    args: Prisma.BookingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                findMany: {
                    args: Prisma.BookingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>[];
                };
                create: {
                    args: Prisma.BookingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                createMany: {
                    args: Prisma.BookingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>[];
                };
                delete: {
                    args: Prisma.BookingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                update: {
                    args: Prisma.BookingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                deleteMany: {
                    args: Prisma.BookingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BookingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BookingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>[];
                };
                upsert: {
                    args: Prisma.BookingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                aggregate: {
                    args: Prisma.BookingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBooking>;
                };
                groupBy: {
                    args: Prisma.BookingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BookingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BookingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BookingCountAggregateOutputType> | number;
                };
            };
        };
        DiscountUsage: {
            payload: Prisma.$DiscountUsagePayload<ExtArgs>;
            fields: Prisma.DiscountUsageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DiscountUsageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountUsagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DiscountUsageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountUsagePayload>;
                };
                findFirst: {
                    args: Prisma.DiscountUsageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountUsagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DiscountUsageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountUsagePayload>;
                };
                findMany: {
                    args: Prisma.DiscountUsageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountUsagePayload>[];
                };
                create: {
                    args: Prisma.DiscountUsageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountUsagePayload>;
                };
                createMany: {
                    args: Prisma.DiscountUsageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DiscountUsageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountUsagePayload>[];
                };
                delete: {
                    args: Prisma.DiscountUsageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountUsagePayload>;
                };
                update: {
                    args: Prisma.DiscountUsageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountUsagePayload>;
                };
                deleteMany: {
                    args: Prisma.DiscountUsageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DiscountUsageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DiscountUsageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountUsagePayload>[];
                };
                upsert: {
                    args: Prisma.DiscountUsageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscountUsagePayload>;
                };
                aggregate: {
                    args: Prisma.DiscountUsageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDiscountUsage>;
                };
                groupBy: {
                    args: Prisma.DiscountUsageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiscountUsageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DiscountUsageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiscountUsageCountAggregateOutputType> | number;
                };
            };
        };
        Plan: {
            payload: Prisma.$PlanPayload<ExtArgs>;
            fields: Prisma.PlanFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PlanFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PlanFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanPayload>;
                };
                findFirst: {
                    args: Prisma.PlanFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PlanFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanPayload>;
                };
                findMany: {
                    args: Prisma.PlanFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanPayload>[];
                };
                create: {
                    args: Prisma.PlanCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanPayload>;
                };
                createMany: {
                    args: Prisma.PlanCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PlanCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanPayload>[];
                };
                delete: {
                    args: Prisma.PlanDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanPayload>;
                };
                update: {
                    args: Prisma.PlanUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanPayload>;
                };
                deleteMany: {
                    args: Prisma.PlanDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PlanUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PlanUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanPayload>[];
                };
                upsert: {
                    args: Prisma.PlanUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanPayload>;
                };
                aggregate: {
                    args: Prisma.PlanAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePlan>;
                };
                groupBy: {
                    args: Prisma.PlanGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlanGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PlanCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlanCountAggregateOutputType> | number;
                };
            };
        };
        Price: {
            payload: Prisma.$PricePayload<ExtArgs>;
            fields: Prisma.PriceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PriceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PriceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricePayload>;
                };
                findFirst: {
                    args: Prisma.PriceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PriceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricePayload>;
                };
                findMany: {
                    args: Prisma.PriceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricePayload>[];
                };
                create: {
                    args: Prisma.PriceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricePayload>;
                };
                createMany: {
                    args: Prisma.PriceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PriceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricePayload>[];
                };
                delete: {
                    args: Prisma.PriceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricePayload>;
                };
                update: {
                    args: Prisma.PriceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricePayload>;
                };
                deleteMany: {
                    args: Prisma.PriceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PriceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PriceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricePayload>[];
                };
                upsert: {
                    args: Prisma.PriceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PricePayload>;
                };
                aggregate: {
                    args: Prisma.PriceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePrice>;
                };
                groupBy: {
                    args: Prisma.PriceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PriceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PriceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PriceCountAggregateOutputType> | number;
                };
            };
        };
        Subscription: {
            payload: Prisma.$SubscriptionPayload<ExtArgs>;
            fields: Prisma.SubscriptionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                findFirst: {
                    args: Prisma.SubscriptionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                findMany: {
                    args: Prisma.SubscriptionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>[];
                };
                create: {
                    args: Prisma.SubscriptionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                createMany: {
                    args: Prisma.SubscriptionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>[];
                };
                delete: {
                    args: Prisma.SubscriptionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                update: {
                    args: Prisma.SubscriptionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                deleteMany: {
                    args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>[];
                };
                upsert: {
                    args: Prisma.SubscriptionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscriptionPayload>;
                };
                aggregate: {
                    args: Prisma.SubscriptionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSubscription>;
                };
                groupBy: {
                    args: Prisma.SubscriptionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SubscriptionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SubscriptionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SubscriptionCountAggregateOutputType> | number;
                };
            };
        };
        Verification: {
            payload: Prisma.$VerificationPayload<ExtArgs>;
            fields: Prisma.VerificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VerificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
                };
                findFirst: {
                    args: Prisma.VerificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
                };
                findMany: {
                    args: Prisma.VerificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>[];
                };
                create: {
                    args: Prisma.VerificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
                };
                createMany: {
                    args: Prisma.VerificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>[];
                };
                delete: {
                    args: Prisma.VerificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
                };
                update: {
                    args: Prisma.VerificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
                };
                deleteMany: {
                    args: Prisma.VerificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VerificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>[];
                };
                upsert: {
                    args: Prisma.VerificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VerificationPayload>;
                };
                aggregate: {
                    args: Prisma.VerificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVerification>;
                };
                groupBy: {
                    args: Prisma.VerificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VerificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VerificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VerificationCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
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
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type EnumPlatformRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlatformRole'>;
export type ListEnumPlatformRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlatformRole[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type EnumLegalEntityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LegalEntityType'>;
export type ListEnumLegalEntityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LegalEntityType[]'>;
export type EnumCompanyRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompanyRole'>;
export type ListEnumCompanyRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompanyRole[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>;
export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>;
export type EnumBillingIntervalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BillingInterval'>;
export type ListEnumBillingIntervalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BillingInterval[]'>;
export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>;
export type ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus[]'>;
export type EnumVerificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationType'>;
export type ListEnumVerificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationType[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    business?: Prisma.BusinessOmit;
    membership?: Prisma.MembershipOmit;
    location?: Prisma.LocationOmit;
    service?: Prisma.ServiceOmit;
    discount?: Prisma.DiscountOmit;
    booking?: Prisma.BookingOmit;
    discountUsage?: Prisma.DiscountUsageOmit;
    plan?: Prisma.PlanOmit;
    price?: Prisma.PriceOmit;
    subscription?: Prisma.SubscriptionOmit;
    verification?: Prisma.VerificationOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
