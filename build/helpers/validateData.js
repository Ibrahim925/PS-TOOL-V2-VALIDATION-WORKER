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
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
[];
var validateData = function (csvJSON, rules, projectVersion, allObjects, job) { return __awaiter(void 0, void 0, void 0, function () {
    var fields, outputCSV, errorCount, i, length, newRow, rowNumber, row, rowHasErrors, dependencyErrors, _i, _a, error, existenceErrors, _b, _c, error, dataTypeErrors, _d, _e, error;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                fields = Object.keys(csvJSON[0]).map(function (fullField) {
                    var arr = fullField.split("~");
                    var field = arr[0];
                    var occurrence = Number(arr[1]);
                    return {
                        field: field,
                        occurrence: occurrence,
                        fullField: fullField,
                    };
                });
                outputCSV = [];
                errorCount = {
                    dependency: 0,
                    existence: 0,
                    dataType: 0,
                    rows: 0,
                };
                i = 0, length = csvJSON.length;
                _f.label = 1;
            case 1:
                if (!(i < length)) return [3 /*break*/, 4];
                newRow = cleanData(csvJSON[i], projectVersion, fields, rules);
                rowNumber = i + 2;
                csvJSON[i] = newRow;
                row = newRow;
                rowHasErrors = false;
                return [4 /*yield*/, validateDependencies(row, rules, fields, allObjects)];
            case 2:
                dependencyErrors = _f.sent();
                if (dependencyErrors.errorCount) {
                    for (_i = 0, _a = dependencyErrors.payload.errors; _i < _a.length; _i++) {
                        error = _a[_i];
                        outputCSV.push(__assign(__assign({}, csvJSON[i]), { Error: error.message, "Row Number": rowNumber, "Error Type": "DEPENDENCY" }));
                    }
                    errorCount.dependency = dependencyErrors.errorCount;
                    rowHasErrors = true;
                }
                existenceErrors = validateDataExistence(row, rules, fields);
                if (existenceErrors.errorCount) {
                    for (_b = 0, _c = existenceErrors.payload.errors; _b < _c.length; _b++) {
                        error = _c[_b];
                        outputCSV.push(__assign(__assign({}, csvJSON[i]), { Error: error.message, "Row Number": rowNumber, "Error Type": "MISSING DATA" }));
                    }
                    errorCount.existence += existenceErrors.errorCount;
                    rowHasErrors = true;
                }
                dataTypeErrors = validateDataType(row, rules, fields);
                if (dataTypeErrors.errorCount) {
                    for (_d = 0, _e = dataTypeErrors.payload.errors; _d < _e.length; _d++) {
                        error = _e[_d];
                        outputCSV.push(__assign(__assign({}, csvJSON[i]), { Error: error.message, "Row Number": rowNumber, "Error Type": "DATA TYPE" }));
                    }
                    errorCount.dataType += dataTypeErrors.errorCount;
                    rowHasErrors = true;
                }
                if (rowHasErrors)
                    errorCount.rows++;
                job.progress((i / length) * 100);
                _f.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, { outputCsvJSON: outputCSV, exportCsvJSON: csvJSON, errorCount: errorCount }];
        }
    });
}); };
// Clean (remove whitespace, remove special characters -- ONLY FOR V9)
var cleanData = function (row, projectVersion, fields, rules) {
    var _loop_1 = function (i, len) {
        var _a = fields[i], field = _a.field, occurrence = _a.occurrence, fullField = _a.fullField;
        var rule = rules.filter(function (rule) {
            return rule.ruleField === field && rule.ruleFieldOccurrence === occurrence;
        })[0];
        var dataType = typeof row[fullField];
        if (dataType === "string") {
            row[fullField] = row[fullField].trim();
            if (projectVersion === "V9") {
                var newStr = "";
                for (var j = 0, len_1 = row[fullField].length; j < len_1; j++) {
                    var char = row[fullField][j];
                    switch (char) {
                        case "&":
                            newStr += "&amp;";
                            break;
                        case "<":
                            newStr += "&lt;";
                            break;
                        case ">":
                            newStr += "&gt;";
                            break;
                        case '"':
                            newStr += "&quot;";
                            break;
                        case "'":
                            newStr += "&apos;";
                            break;
                        case "/":
                            newStr += " ";
                            break;
                        default:
                            newStr += char;
                            break;
                    }
                }
                row[fullField] = newStr;
                switch (rule.ruleCase) {
                    case types_1.Cases.Camel:
                        row[fullField] = row.fullField
                            .split(" ")
                            .map(function (word) { return word[0].toUpperCase() + word.slice(1); })
                            .join("");
                        break;
                    case types_1.Cases.Lower:
                        row[fullField] = row[fullField].toLowerCase();
                        break;
                    case types_1.Cases.Snake:
                        row[fullField] = row[fullField].toLowerCase().split(" ").join("_");
                        break;
                    case types_1.Cases.Upper:
                        row[fullField] = row[fullField].toUpperCase();
                        break;
                }
            }
        }
    };
    for (var i = 0, len = fields.length; i < len; i++) {
        _loop_1(i, len);
    }
    return row;
};
// Validate dependencies
var validateDependencies = function (row, rules, fields, allObjects) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _loop_2, _i, fields_1, _a, field, occurrence, fullField;
    return __generator(this, function (_b) {
        errors = [];
        _loop_2 = function (field, occurrence, fullField) {
            var rule = rules.filter(function (rule) {
                return rule.ruleField === field && rule.ruleFieldOccurrence === occurrence;
            })[0];
            var data = row[fullField].toString();
            if (!rule.ruleDependency)
                return "continue";
            var arr = rule.ruleDependency.split(".");
            var parentObject = arr[0];
            var parentField = arr[1];
            var parentFieldData = allObjects
                .filter(function (object) { return object.objectName === parentObject; })[0]
                .parentCsvJson.map(function (row) { return row[parentField]; });
            if (!parentFieldData.includes(data))
                errors.push({
                    message: field + ": \"" + data + "\" does not exist in the " + parentObject + " object",
                });
        };
        for (_i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            _a = fields_1[_i], field = _a.field, occurrence = _a.occurrence, fullField = _a.fullField;
            _loop_2(field, occurrence, fullField);
        }
        return [2 /*return*/, { errorCount: errors.length, payload: { errors: errors } }];
    });
}); };
// Validate datatype
var validateDateFormat = function (date) {
    var dateArray = date.split("/");
    if (dateArray.length !== 3)
        return false;
    return Number(date[0]) > 12 || Number(date[1]) > 31 || Number(date[2]) < 2000;
};
var validateDataType = function (row, rules, fields) {
    var errors = [];
    var _loop_3 = function (field, occurrence, fullField) {
        var rule = rules.filter(function (rule) {
            return rule.ruleField === field && rule.ruleFieldOccurrence === occurrence;
        })[0];
        var ruleTypeArray = rule.ruleDataType.split("(");
        var type = ruleTypeArray[0].toUpperCase();
        var upperBound = Number.POSITIVE_INFINITY;
        var lowerBound = Number.NEGATIVE_INFINITY;
        if ((type === types_1.DataTypes.String ||
            type === types_1.DataTypes.Integer ||
            type === types_1.DataTypes.Nvarchar ||
            type === types_1.DataTypes.Decimal) &&
            ruleTypeArray.length > 1) {
            var bound = ruleTypeArray[1].split(")")[0];
            var bounds = bound.split("-");
            if (bounds.length > 1) {
                upperBound = Number(bounds[1]);
                lowerBound = Number(bounds[0]);
            }
            else {
                upperBound = Number(bounds[0]);
            }
        }
        var data = row[fullField];
        var dataType = (typeof data).toUpperCase();
        var commonError = field + ": Expected " + type + " but got " + dataType;
        var upperBoundError = field + ": " + type + " must be less than or equal to " + upperBound;
        var lowerBoundError = field + ": " + type + " must be greater than or equal to " + lowerBound;
        switch (type) {
            case types_1.DataTypes.Boolean:
                if (dataType !== "BOOLEAN") {
                    errors.push({
                        message: commonError,
                    });
                    return "continue";
                }
                break;
            case types_1.DataTypes.Char:
                if (dataType !== "STRING" || data.length !== 1) {
                    errors.push({
                        message: commonError,
                    });
                    return "continue";
                }
                break;
            case types_1.DataTypes.Decimal:
            case types_1.DataTypes.Integer:
                if (dataType !== "NUMBER") {
                    errors.push({
                        message: commonError,
                    });
                    return "continue";
                }
                if (data > upperBound) {
                    errors.push({
                        message: upperBoundError,
                    });
                }
                if (data < lowerBound) {
                    errors.push({
                        message: lowerBoundError,
                    });
                }
                break;
            case types_1.DataTypes.String:
                if (dataType !== "STRING") {
                    errors.push({
                        message: commonError,
                    });
                    return "continue";
                }
                if (data > upperBound) {
                    errors.push({
                        message: upperBoundError,
                    });
                }
                if (data < lowerBound) {
                    errors.push({
                        message: lowerBoundError,
                    });
                }
                break;
            case types_1.DataTypes.DateTime:
                var isDateFormat = validateDateFormat(data);
                if (!isDateFormat) {
                    errors.push({
                        message: field + ": Please enter the date in MM/DD/YYYY format",
                    });
                }
                break;
            default:
                break;
        }
    };
    for (var _i = 0, fields_2 = fields; _i < fields_2.length; _i++) {
        var _a = fields_2[_i], field = _a.field, occurrence = _a.occurrence, fullField = _a.fullField;
        _loop_3(field, occurrence, fullField);
    }
    return { errorCount: errors.length, payload: { errors: errors } };
};
// Validate existence
var validateDataExistence = function (row, rules, fields) {
    var errors = [];
    var _loop_4 = function (field, occurrence, fullField) {
        var rule = rules.filter(function (rule) {
            return rule.ruleField === field && rule.ruleFieldOccurrence === occurrence;
        })[0];
        var data = row[fullField];
        if (!data && rule.ruleRequired && data !== 0)
            errors.push({ message: field + ": Expected a value in column " + field });
    };
    for (var _i = 0, fields_3 = fields; _i < fields_3.length; _i++) {
        var _a = fields_3[_i], field = _a.field, occurrence = _a.occurrence, fullField = _a.fullField;
        _loop_4(field, occurrence, fullField);
    }
    return { errorCount: errors.length, payload: { errors: errors } };
};
// Validate dependency
exports.default = validateData;
//# sourceMappingURL=validateData.js.map