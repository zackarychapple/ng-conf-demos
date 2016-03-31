System.register(['./Guid'], function(exports_1) {
    "use strict";
    var Guid_1;
    var PerformanceObject;
    return {
        setters:[
            function (Guid_1_1) {
                Guid_1 = Guid_1_1;
            }],
        execute: function() {
            PerformanceObject = (function () {
                function PerformanceObject() {
                    this.angularVersion = '';
                    this.customProperties = {};
                    this.downloadSpeed = 0;
                    this.downloadSpeedUnit = 'mb/s';
                    this.guid = new Guid_1.Guid();
                    this.location = {};
                    this.marks = [];
                    this.measures = [];
                    this.memory = {};
                    this.navigation = {};
                    this.resources = [];
                    this.routeEvents = [];
                    this.userAgent = '';
                    this.watcherCount = 0;
                    this.time = new Date(Date.now());
                    return this;
                }
                return PerformanceObject;
            }());
            exports_1("PerformanceObject", PerformanceObject);
        }
    }
});
//# sourceMappingURL=PerformanceObject.js.map