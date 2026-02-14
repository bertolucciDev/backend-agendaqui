"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = require("@prisma/client/runtime/client");
const config = {
    "previewFeatures": [],
    "clientVersion": "7.4.0",
    "engineVersion": "ab56fe763f921d033a6c195e7ddeb3e255bdbb57",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider     = \"prisma-client\"\n  output       = \"../generated/prisma\"\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel User {\n  id String @id @default(uuid())\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_count\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"contains\",\"startsWith\",\"endsWith\",\"not\",\"set\"]"),
    graph: "JAkQBBoAAB8AMBsAAAQAEBwAAB8AMB0BAAAAAQEAAAABACABAAAAAQAgBBoAAB8AMBsAAAQAEBwAAB8AMB0BACAAIQADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACABHQEAAAABAQgAAAkAIAEdAQAAAAEBCAAACwAwAQgAAAsAMAEdAQAkACECAAAAAQAgCAAADgAgAR0BACQAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgAxUAACEAIBYAACMAIBcAACIAIAQaAAAaADAbAAAXABAcAAAaADAdAQAbACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAQaAAAaADAbAAAXABAcAAAaADAdAQAbACEOFQAAHQAgFgAAHgAgFwAAHgAgHgEAAAABHwEAAAAEIAEAAAAEIQEAAAABIgEAAAABIwEAAAABJAEAAAABJQEAAAABJgEAAAABJwEAAAABKAEAHAAhDhUAAB0AIBYAAB4AIBcAAB4AIB4BAAAAAR8BAAAABCABAAAABCEBAAAAASIBAAAAASMBAAAAASQBAAAAASUBAAAAASYBAAAAAScBAAAAASgBABwAIQgeAgAAAAEfAgAAAAQgAgAAAAQhAgAAAAEiAgAAAAEjAgAAAAEkAgAAAAEoAgAdACELHgEAAAABHwEAAAAEIAEAAAAEIQEAAAABIgEAAAABIwEAAAABJAEAAAABJQEAAAABJgEAAAABJwEAAAABKAEAHgAhBBoAAB8AMBsAAAQAEBwAAB8AMB0BACAAIQseAQAAAAEfAQAAAAQgAQAAAAQhAQAAAAEiAQAAAAEjAQAAAAEkAQAAAAElAQAAAAEmAQAAAAEnAQAAAAEoAQAeACEAAAABKQEAAAABAAAAAAMVAAYWAAcXAAgAAAADFQAGFgAHFwAIAQIBAgMBBQYBBgcBBwgBCQoBCgwCCw0DDA8BDRECDhIEERMBEhQBExUCGBgFGRkJ"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await Promise.resolve().then(() => require('node:buffer'));
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await Promise.resolve().then(() => require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js")),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await Promise.resolve().then(() => require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js"));
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map