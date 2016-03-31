System.register([], function(exports_1) {
    "use strict";
    var HeimdallrUiRouter;
    return {
        setters:[],
        execute: function() {
            HeimdallrUiRouter = (function () {
                function HeimdallrUiRouter(routeEventArray, sendEvent, messages, $rootScope) {
                    this.routeEventArray = [];
                    this.errorMsg = messages;
                    this.routeEventArray = routeEventArray;
                    this.sendEvent = sendEvent;
                    this.$rootScope = $rootScope;
                    this.bindRoutingEvents();
                }
                HeimdallrUiRouter.prototype.bindRoutingEvents = function () {
                    var _this = this;
                    try {
                        if (typeof angular.module('ui.router') !== 'undefined') {
                            this.$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                                var now = new Date(Date.now()).getTime().toString();
                                _this.routeEventArray.push({
                                    'event': now,
                                    'fromState': fromState,
                                    'fromParams': fromParams,
                                    'toState': toState,
                                    'toParams': toParams
                                });
                                performance.mark(now);
                            });
                            this.$rootScope.$on('$viewContentLoaded', function () {
                                var now = new Date(Date.now()).getTime().toString();
                                performance.mark(now);
                                if (_this.routeEventArray.length > 1) {
                                    var toName = _this.routeEventArray[_this.routeEventArray.length - 1].toState.name;
                                    var fromName = _this.routeEventArray[_this.routeEventArray.length - 1].fromState.name;
                                    var eventStamp = _this.routeEventArray[_this.routeEventArray.length - 1].event;
                                    try {
                                        performance.measure("Successful change from: " + fromName + " to: " + toName, eventStamp, now);
                                    }
                                    catch (error) {
                                        console.log(_this.errorMsg.measureMissing + error);
                                    }
                                    performance.clearMarks(eventStamp);
                                }
                                _this.sendEvent("currentView", toName);
                            });
                        }
                    }
                    catch (error) {
                        console.log(error);
                    }
                };
                return HeimdallrUiRouter;
            }());
            exports_1("HeimdallrUiRouter", HeimdallrUiRouter);
        }
    }
});
//# sourceMappingURL=HeimdallrUiRouter.js.map