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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = void 0;
/* the first ever group by with no mutations in typescript */
var groupBy = function (arr, key) {
    return arr.reduce(function (pv, cv) {
        var _a;
        return (__assign(__assign({}, pv), (_a = {}, _a[cv[key]] = __spreadArray(__spreadArray([], pv[cv[key]] || [], true), [cv], false) || [], _a)));
    }, {});
};
exports.groupBy = groupBy;
/* gpt response to my challenge */
// export const groupBy = (arr, key) => arr.reduce((acc, obj) => ({ ...acc, [obj[key]]: [...(acc[obj[key]] || []), obj] }), {});
