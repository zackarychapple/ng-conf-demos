System.register([], function(exports_1) {
    "use strict";
    var BrowserPerformance;
    return {
        setters:[],
        execute: function() {
            BrowserPerformance = (function () {
                function BrowserPerformance() {
                }
                BrowserPerformance.prototype.clearMeasures = function (measureName) {
                    if (typeof performance.clearMeasures === 'function') {
                        return performance.clearMeasures(measureName);
                    }
                };
                BrowserPerformance.prototype.clearMarks = function (name) {
                    if (typeof performance.clearMarks === 'function') {
                        return performance.clearMarks(name);
                    }
                };
                BrowserPerformance.prototype.clearResourceTimings = function () {
                    if (typeof performance.clearResourceTimings == 'function') {
                        return performance.clearResourceTimings();
                    }
                };
                BrowserPerformance.prototype.getEntries = function () {
                    if (typeof performance.getEntries == 'function') {
                        return performance.getEntries();
                    }
                };
                BrowserPerformance.prototype.getEntriesByType = function (type) {
                    if (typeof performance.getEntriesByType == 'function') {
                        return performance.getEntriesByType(type);
                    }
                };
                BrowserPerformance.prototype.mark = function (name) {
                    if (typeof performance.mark == 'function') {
                        return performance.mark(name);
                    }
                };
                BrowserPerformance.prototype.measure = function (lable, startMark, endMark) {
                    if (typeof performance.measure == 'function') {
                        return performance.measure(lable, startMark, endMark);
                    }
                };
                BrowserPerformance.prototype.memory = function () {
                    if (typeof performance.memory !== 'undefined') {
                        return performance.memory;
                    }
                    else {
                        return {
                            jsHeapSizeLimit: 0,
                            totalJSHeapSize: 0,
                            usedJSHeapSize: 0
                        };
                    }
                };
                BrowserPerformance.prototype.timing = function () {
                    if (typeof performance.timing !== 'undefined') {
                        return performance.timing;
                    }
                };
                return BrowserPerformance;
            }());
            exports_1("BrowserPerformance", BrowserPerformance);
        }
    }
});
//# sourceMappingURL=BrowserPerformance.js.map