System.register([], function(exports_1) {
    "use strict";
    var HeimdallrErrors;
    return {
        setters:[],
        execute: function() {
            HeimdallrErrors = (function () {
                function HeimdallrErrors() {
                    this.measureMissing = "HeimdallrSvc: One of the measure marks is missing: ";
                    this.noUiRouter = "HeimdallrSvc: ui.router not in use";
                    this.duplicateRum = 'HeimdallrSvc: Property not added, duplicate key exists on rum object';
                    this.urlMissing = 'HeimdallrSvc: URL not specified stats will not be sent';
                    this.testCount = 'test count is less than entry count';
                }
                return HeimdallrErrors;
            }());
            exports_1("HeimdallrErrors", HeimdallrErrors);
        }
    }
});
//# sourceMappingURL=HeimdallrErrors.js.map