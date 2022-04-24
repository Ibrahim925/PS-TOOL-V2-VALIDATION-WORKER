"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cases = exports.DataTypes = exports.Config = exports.Versions = void 0;
// Valid versions
var Versions;
(function (Versions) {
    Versions["V9"] = "V9";
    Versions["V10"] = "V10";
})(Versions = exports.Versions || (exports.Versions = {}));
// Rules
var Config;
(function (Config) {
    Config["Base"] = "Base";
    Config["Business"] = "Business";
    Config["Customer"] = "Customer";
})(Config = exports.Config || (exports.Config = {}));
var DataTypes;
(function (DataTypes) {
    DataTypes["String"] = "STRING";
    DataTypes["Integer"] = "INTEGER";
    DataTypes["Boolean"] = "BOOLEAN";
    DataTypes["Char"] = "CHAR";
    DataTypes["DateTime"] = "DATETIME";
    DataTypes["Text"] = "TEXT";
    DataTypes["Decimal"] = "DECIMAL";
    DataTypes["Nvarchar"] = "NVARCHAR";
})(DataTypes = exports.DataTypes || (exports.DataTypes = {}));
var Cases;
(function (Cases) {
    Cases["Upper"] = "UPPER";
    Cases["Lower"] = "LOWER";
    Cases["Camel"] = "CAMEL";
    Cases["Snake"] = "SNAKE";
    Cases["Any"] = "ANY";
})(Cases = exports.Cases || (exports.Cases = {}));
//# sourceMappingURL=types.js.map