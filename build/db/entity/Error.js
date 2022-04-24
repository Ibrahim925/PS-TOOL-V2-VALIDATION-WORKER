"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
var typeorm_1 = require("typeorm");
var Error = /** @class */ (function (_super) {
    __extends(Error, _super);
    function Error() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Error.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Error.prototype, "errorRun", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Error.prototype, "errorProject", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Error.prototype, "errorObject", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Error.prototype, "errorCount", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Error.prototype, "errorFree", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Error.prototype, "errorDependency", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Error.prototype, "errorDataType", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Error.prototype, "errorExistence", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Error.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Error.prototype, "updatedAt", void 0);
    Error = __decorate([
        typeorm_1.Entity()
    ], Error);
    return Error;
}(typeorm_1.BaseEntity));
exports.Error = Error;
//# sourceMappingURL=Error.js.map