"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
require("dotenv/config");
typeorm_1.createConnection({
    type: "mysql",
    host: process.env.dbHost,
    port: 3306,
    username: process.env.dbUserName,
    password: process.env.dbPassword,
    database: process.env.dbName,
    synchronize: true,
    entities: ["build/db/entity/**/*.js"],
    cli: {
        entitiesDir: "build/db/entity",
        migrationsDir: "build/db/migration",
        subscribersDir: "build/db/subscriber",
    },
}).then(function (returnedConnection) {
    exports.connection = returnedConnection;
});
//# sourceMappingURL=connection.js.map