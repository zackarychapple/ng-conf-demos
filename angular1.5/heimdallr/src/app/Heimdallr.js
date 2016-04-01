System.register(["./PerformanceObject", "./BrowserPerformance", "./HeimdallrHttp", "./HeimdallrErrors", "./HeimdallrUiRouter", "./HeimdallrNgComponentRouter", './Guid'], function(exports_1) {
    "use strict";
    var PerformanceObject_1, BrowserPerformance_1, HeimdallrHttp_1, HeimdallrErrors_1, HeimdallrUiRouter_1, HeimdallrNgComponentRouter_1, Guid_1;
    var ConfigObj, Heimdallr;
    return {
        setters:[
            function (PerformanceObject_1_1) {
                PerformanceObject_1 = PerformanceObject_1_1;
            },
            function (BrowserPerformance_1_1) {
                BrowserPerformance_1 = BrowserPerformance_1_1;
            },
            function (HeimdallrHttp_1_1) {
                HeimdallrHttp_1 = HeimdallrHttp_1_1;
            },
            function (HeimdallrErrors_1_1) {
                HeimdallrErrors_1 = HeimdallrErrors_1_1;
            },
            function (HeimdallrUiRouter_1_1) {
                HeimdallrUiRouter_1 = HeimdallrUiRouter_1_1;
            },
            function (HeimdallrNgComponentRouter_1_1) {
                HeimdallrNgComponentRouter_1 = HeimdallrNgComponentRouter_1_1;
            },
            function (Guid_1_1) {
                Guid_1 = Guid_1_1;
            }],
        execute: function() {
            ConfigObj = (function () {
                function ConfigObj() {
                    this.router = '';
                    this.url = '';
                }
                return ConfigObj;
            }());
            exports_1("ConfigObj", ConfigObj);
            Heimdallr = (function () {
                function Heimdallr($rootScope) {
                    this.bp = new BrowserPerformance_1.BrowserPerformance();
                    this.customEventArray = [];
                    this.customFunctions = [];
                    this.msg = new HeimdallrErrors_1.HeimdallrErrors();
                    this.http = new HeimdallrHttp_1.HeimdallrHttp();
                    this.intervalTime = 10000;
                    this.rumData = new PerformanceObject_1.PerformanceObject();
                    this.routeEventsArray = [];
                    this.url = '';
                    this.$rootScope = $rootScope;
                }
                Heimdallr.prototype.addEvent = function (name) {
                    this.bp.mark(name);
                    this.customEventArray.push(name);
                };
                Heimdallr.prototype.append = function (attr, value) {
                    this.rumData.customProperties[attr] = value;
                };
                Heimdallr.prototype.appendAndSend = function (attr, value, remove) {
                    var _this = this;
                    this.append(attr, value);
                    var deleteAfterSend = function () {
                        delete _this.rumData.customProperties[attr];
                    };
                    if (this.url !== '') {
                        this.sendStats(remove ? deleteAfterSend : null);
                    }
                };
                Heimdallr.prototype.injectible = function (funcs) {
                    (_a = this.customFunctions).push.apply(_a, funcs);
                    var _a;
                };
                Heimdallr.prototype.interval = function () {
                    var _this = this;
                    setInterval(function () {
                        _this.sendStats();
                    }, this.intervalTime);
                };
                Heimdallr.prototype.init = function (config) {
                    this.url = config.url;
                    if (config.router === 'ui.router') {
                        this.router = new HeimdallrUiRouter_1.HeimdallrUiRouter(this.routeEventsArray, this.appendAndSend.bind(this), this.msg, this.$rootScope);
                    }
                    if (config.router === 'ngComponentRouter') {
                        this.router = new HeimdallrNgComponentRouter_1.HeimdallrNgComponentRouter(this.routeEventsArray, this.appendAndSend.bind(this), this.msg, this.$rootScope);
                    }
                    if (config.intervalTime) {
                        this.intervalTime = config.intervalTime;
                    }
                    if (config.guid) {
                        this.rumData.guid = config.guid;
                    }
                    else {
                        this.rumData.guid = Guid_1.Guid.newGuid();
                    }
                    if (config.customProperties) {
                        var props = config.customProperties;
                        for (var key in props) {
                            if (props.hasOwnProperty(key)) {
                                if (!this.rumData.customProperties.hasOwnProperty(key)) {
                                    this.rumData.customProperties[key] = props[key];
                                }
                            }
                        }
                    }
                    this.interval();
                };
                Heimdallr.prototype.measure = function (lable, startMark, endMark, remove) {
                    try {
                        this.bp.measure(lable, startMark, endMark);
                        if (remove) {
                            this.customEventArray
                                .splice(this.customEventArray.indexOf(startMark), 1)
                                .splice(this.customEventArray.indexOf(endMark), 1);
                        }
                    }
                    catch (error) {
                        console.log(this.msg.measureMissing);
                    }
                };
                Heimdallr.prototype.performanceTest = function (testCount) {
                    var _this = this;
                    var host = window.location.host;
                    var protocol = window.location.protocol;
                    var entries;
                    var speedTotal = 0;
                    if (testCount && this.bp.getEntries().length > testCount) {
                        entries = this.bp.getEntries().slice(0, testCount);
                    }
                    else {
                        entries = this.bp.getEntries();
                    }
                    entries.forEach(function (entry) {
                        var url = entry.name;
                        var urlParser = document.createElement('a');
                        urlParser.href = url;
                        if (urlParser.host === host && urlParser.protocol === protocol) {
                            var fileSize = _this.http.getSize(url);
                            if (!isNaN(fileSize)) {
                                speedTotal += (fileSize / 1024 / 1024) / (entry.duration / 1000 / 1000);
                            }
                        }
                    });
                    this.rumData.downloadSpeed = Math.round((speedTotal / entries.length));
                };
                Heimdallr.prototype.sendStats = function (callback) {
                    if (this.url !== '') {
                        this.updateRum();
                        this.http.post(this.url, this.rumData, callback);
                        this.bp.clearMeasures();
                        this.bp.clearResourceTimings();
                    }
                };
                Heimdallr.prototype.updateRum = function () {
                    this.customFunctions.forEach(function (func) {
                        func();
                    });
                    this.rumData.time = new Date(Date.now());
                    this.rumData.location = {
                        href: window.location.href,
                        hash: window.location.hash,
                        hostname: window.location.hostname
                    };
                    this.rumData.navigation = this.bp.timing();
                    this.rumData.resources = this.bp.getEntriesByType('resource');
                    this.rumData.marks = this.bp.getEntriesByType('mark');
                    this.rumData.measures = this.bp.getEntriesByType('measure');
                    this.rumData.memory = {
                        jsHeapSizeLimit: this.bp.memory().jsHeapSizeLimit,
                        totalJSHeapSize: this.bp.memory().totalJSHeapSize,
                        usedJSHeapSize: this.bp.memory().usedJSHeapSize
                    };
                    if (this.routeEventsArray.length > 0) {
                        this.rumData.routeEvents = this.routeEventsArray;
                    }
                    this.rumData.userAgent = navigator.userAgent;
                };
                return Heimdallr;
            }());
            exports_1("Heimdallr", Heimdallr);
        }
    }
});
//# sourceMappingURL=Heimdallr.js.map