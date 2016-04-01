System.register([], function(exports_1) {
    "use strict";
    var HeimdallrNgComponentRouter;
    return {
        setters:[],
        execute: function() {
            HeimdallrNgComponentRouter = (function () {
                function HeimdallrNgComponentRouter(routeEventArray, sendEvent, messages, $rootScope) {
                    this.routeEventArray = [];
                    this.errorMsg = messages;
                    this.routeEventArray = routeEventArray;
                    this.sendEvent = sendEvent;
                    this.$rootScope = $rootScope;
                    this.bindRoutingEvents();
                }
                HeimdallrNgComponentRouter.prototype.bindRoutingEvents = function () {
                    var _this = this;
                    try {
                        if (typeof angular.module('ngComponentRouter') !== 'undefined') {
                            this.$rootScope.$on('routerOnActivate', function (event, data) {
                                var now = new Date(Date.now()).getTime().toString();
                                var eventObj = {
                                    'eventTime': now,
                                    'event': event.name,
                                    'next': data.next
                                };
                                if (data.previous){
                                    eventObj['prev'] = data.previous
                                }
                                _this.routeEventArray.push(eventObj);
                                performance.mark(now);
                            });
                            this.$rootScope.$on('$viewContentLoaded', function () {
                                var now = new Date(Date.now()).getTime().toString();
                                performance.mark(now);
                                if (_this.routeEventArray.length > 1) {
                                    var toName = _this.routeEventArray[_this.routeEventArray.length - 1].next.name;
                                    var fromName = _this.routeEventArray[_this.routeEventArray.length - 1].prev.name;
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
                return HeimdallrNgComponentRouter;
            }());
            exports_1("HeimdallrNgComponentRouter", HeimdallrNgComponentRouter);
        }
    }
});
