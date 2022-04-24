"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTime = exports.getDay = void 0;
var getDay = function () {
    var date = new Date();
    var d = String(date.getDate()).padStart(2, "0");
    var m = String(date.getMonth() + 1).padStart(2, "0");
    var y = date.getFullYear();
    var day = m + "-" + d + "-" + y;
    return day;
};
exports.getDay = getDay;
var getTime = function () {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
};
exports.getTime = getTime;
//# sourceMappingURL=getNow.js.map