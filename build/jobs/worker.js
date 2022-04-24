"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bull_1 = __importDefault(require("bull"));
require("dotenv/config");
var csv_1 = require("../helpers/csv");
var notificationHandler_1 = require("../helpers/notificationHandler");
var validateColumns_1 = __importDefault(require("../helpers/validateColumns"));
var Error_1 = require("../db/entity/Error");
var connection_1 = require("../db/connection");
var getNow_1 = require("../helpers/getNow");
var Project_1 = require("../db/entity/Project");
var Rule_1 = require("../db/entity/Rule");
var validateData_1 = __importDefault(require("../helpers/validateData"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    region: "us-east-2",
    credentials: {
        accessKeyId: process.env.IAM_ACCESS_KEY,
        secretAccessKey: process.env.IAM_SECRET_KEY,
    },
});
var queue = new bull_1.default("validation", process.env.REDIS_URL);
queue.process(function (job) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, objectName, projectName, s3, params, csvText, csv, err_1, err_2, projectVersion, allRules, rules, data, allObjects, rules_1, rules_1_1, rule, _b, parentObject_1, parentField, objects, e_1_1, errors, csvJSON, isColumnsValid, _c, outputCsvJSON, errorCount, exportCsvJSON, dataType, dependency, existence, rows, totalErrors, prevRun, currentRun, newError, csvText_1, day, path, params_1, csvText_2, params_2, path, params_3;
    var e_1, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = job.data, objectName = _a.objectName, projectName = _a.projectName;
                s3 = new aws_sdk_1.default.S3();
                params = {
                    Bucket: "logisense-csv-data",
                    Key: "VALIDATE/" + projectName + "-" + objectName + ".csv",
                };
                csvText = "";
                _e.label = 1;
            case 1:
                _e.trys.push([1, 3, , 4]);
                return [4 /*yield*/, s3.getObject(params).promise()];
            case 2:
                csv = _e.sent();
                csvText = csv.Body.toString();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _e.sent();
                console.log("ERROR IN GET OBJECT BOB", err_1);
                return [3 /*break*/, 4];
            case 4:
                _e.trys.push([4, 6, , 7]);
                return [4 /*yield*/, s3.deleteObject(params).promise()];
            case 5:
                _e.sent();
                return [3 /*break*/, 7];
            case 6:
                err_2 = _e.sent();
                console.log(err_2, "ERROR IN PHIL");
                return [3 /*break*/, 7];
            case 7: return [4 /*yield*/, Project_1.Project.findOne({
                    select: ["projectVersion"],
                    where: {
                        projectName: projectName,
                    },
                })];
            case 8:
                projectVersion = (_e.sent()).projectVersion;
                return [4 /*yield*/, Rule_1.Rule.find({
                        where: {
                            ruleProject: projectName,
                        },
                    })];
            case 9:
                allRules = _e.sent();
                rules = allRules.filter(function (rule) { return rule.ruleObject === objectName; });
                return [4 /*yield*/, s3
                        .listObjectsV2({ Bucket: "logisense-csv-data", Prefix: "PARENT/" })
                        .promise()];
            case 10:
                data = _e.sent();
                return [4 /*yield*/, Promise.all(data.Contents.map(function (_a) {
                        var Key = _a.Key;
                        var keyWithoutFolderName = Key.split("/")[1];
                        var splitProjectAndObject = keyWithoutFolderName.split("-");
                        splitProjectAndObject[1] = splitProjectAndObject[1].split(".")[0];
                        return {
                            objectProject: splitProjectAndObject[0],
                            objectName: splitProjectAndObject[1],
                        };
                    })
                        .filter(function (key) { return key.objectProject === projectName; })
                        .map(function (object) { return __awaiter(void 0, void 0, void 0, function () {
                        var parentCsvText, params, parentData, err_3, parentCsvJson;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    params = {
                                        Bucket: "logisense-csv-data",
                                        Key: "PARENT/" + object.objectProject + "-" + object.objectName + ".csv",
                                    };
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, s3.getObject(params).promise()];
                                case 2:
                                    parentData = _a.sent();
                                    parentCsvText = parentData.Body.toString();
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_3 = _a.sent();
                                    console.log("BOBOBOBOOBOBOBOBOB", err_3);
                                    return [3 /*break*/, 4];
                                case 4: return [4 /*yield*/, csv_1.CSVToJSON(parentCsvText, rules, ",", false)];
                                case 5:
                                    parentCsvJson = _a.sent();
                                    return [2 /*return*/, __assign({ parentCsvJson: parentCsvJson }, object)];
                            }
                        });
                    }); }))];
            case 11:
                allObjects = _e.sent();
                _e.label = 12;
            case 12:
                _e.trys.push([12, 17, 18, 23]);
                rules_1 = __asyncValues(rules);
                _e.label = 13;
            case 13: return [4 /*yield*/, rules_1.next()];
            case 14:
                if (!(rules_1_1 = _e.sent(), !rules_1_1.done)) return [3 /*break*/, 16];
                rule = rules_1_1.value;
                if (rule.ruleDependency.length) {
                    _b = rule.ruleDependency.split("."), parentObject_1 = _b[0], parentField = _b[1];
                    objects = allObjects.filter(function (object) { return object.objectName === parentObject_1; });
                    if (!objects.length) {
                        return [2 /*return*/, { missingDependencies: [parentObject_1] }];
                    }
                }
                _e.label = 15;
            case 15: return [3 /*break*/, 13];
            case 16: return [3 /*break*/, 23];
            case 17:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 23];
            case 18:
                _e.trys.push([18, , 21, 22]);
                if (!(rules_1_1 && !rules_1_1.done && (_d = rules_1.return))) return [3 /*break*/, 20];
                return [4 /*yield*/, _d.call(rules_1)];
            case 19:
                _e.sent();
                _e.label = 20;
            case 20: return [3 /*break*/, 22];
            case 21:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 22: return [7 /*endfinally*/];
            case 23:
                errors = [];
                console.log("Converting CSV to JSON");
                return [4 /*yield*/, csv_1.CSVToJSON(csvText, rules)];
            case 24:
                csvJSON = _e.sent();
                return [4 /*yield*/, validateColumns_1.default(csvJSON, rules)];
            case 25:
                isColumnsValid = _e.sent();
                if (!!isColumnsValid) return [3 /*break*/, 27];
                errors.push({ message: "Please enter a sheet with the correct fields" });
                return [4 /*yield*/, notificationHandler_1.createNotification(projectName + " uploaded " + objectName + " with incorrect fields", projectName, objectName)];
            case 26:
                _e.sent();
                return [2 /*return*/, {
                        payload: { errors: errors },
                        incorrectFields: true,
                    }];
            case 27:
                // Validate data
                console.log("Beginning data validation");
                return [4 /*yield*/, validateData_1.default(csvJSON, rules, projectVersion, allObjects, job)];
            case 28:
                _c = _e.sent(), outputCsvJSON = _c.outputCsvJSON, errorCount = _c.errorCount, exportCsvJSON = _c.exportCsvJSON;
                console.log("COMPLETE VALIDATION");
                dataType = errorCount.dataType, dependency = errorCount.dependency, existence = errorCount.existence, rows = errorCount.rows;
                totalErrors = dataType + dependency + existence;
                return [4 /*yield*/, Error_1.Error.getRepository().findOne({
                        where: { errorProject: projectName, errorObject: objectName },
                        order: { id: "DESC" },
                    })];
            case 29:
                prevRun = _e.sent();
                if (!prevRun)
                    prevRun = { errorRun: 0 }; // Handle no previous runs
                currentRun = prevRun.errorRun + 1;
                newError = new Error_1.Error();
                newError.errorCount = rows;
                newError.errorDataType = dataType;
                newError.errorDependency = dependency;
                newError.errorExistence = existence;
                newError.errorFree = csvJSON.length - rows;
                newError.errorObject = objectName;
                newError.errorProject = projectName;
                newError.errorRun = currentRun;
                connection_1.connection.manager.save(newError);
                if (!totalErrors) return [3 /*break*/, 33];
                return [4 /*yield*/, csv_1.JSONtoCSV(outputCsvJSON)];
            case 30:
                csvText_1 = _e.sent();
                day = getNow_1.getDay();
                // Create notification
                return [4 /*yield*/, notificationHandler_1.createNotification(projectName + " uploaded " + objectName + " with " + rows + " error" + (rows > 1 ? "s" : ""), projectName, objectName)];
            case 31:
                // Create notification
                _e.sent();
                path = projectName + " - " + rules[0].ruleObject + " Output - " + day + ".csv";
                params_1 = {
                    Bucket: "logisense-csv-data",
                    Key: "OUTPUT/" + path,
                    Body: csvText_1,
                };
                return [4 /*yield*/, s3.putObject(params_1).promise()];
            case 32:
                _e.sent();
                // Sends CSV data with file path. The actual file will be downloaded to the client on the frontend
                return [2 /*return*/, {
                        payload: {
                            path: path,
                        },
                        errorCount: rows,
                    }];
            case 33: return [4 /*yield*/, csv_1.JSONtoCSV(exportCsvJSON)];
            case 34:
                csvText_2 = _e.sent();
                notificationHandler_1.createNotification(projectName + " successfully uploaded " + objectName + " with no errors!", projectName, objectName);
                if (!allRules
                    .map(function (rule) { return rule.ruleDependency.split(".")[0]; })
                    .includes(objectName)) return [3 /*break*/, 36];
                params_2 = {
                    Bucket: "logisense-csv-data",
                    Key: "PARENT/" + projectName + "-" + objectName + ".csv",
                    Body: csvText_2,
                };
                return [4 /*yield*/, s3.putObject(params_2).promise()];
            case 35:
                _e.sent();
                _e.label = 36;
            case 36:
                path = projectName + " - " + rules[0].ruleObject + ".csv";
                params_3 = {
                    Bucket: "logisense-csv-data",
                    Key: "OUTPUT/" + path,
                    Body: csvText_2,
                };
                return [4 /*yield*/, s3.putObject(params_3).promise()];
            case 37:
                _e.sent();
                return [2 /*return*/, {
                        success: true,
                        payload: {
                            path: path,
                        },
                    }];
        }
    });
}); });
//# sourceMappingURL=worker.js.map