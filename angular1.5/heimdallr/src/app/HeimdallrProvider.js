System.register(["./BrowserPerformance"], function(exports_1) {
    "use strict";
    var BrowserPerformance_1;
    var HeimdallrProvider;
    return {
        setters:[
            function (BrowserPerformance_1_1) {
                BrowserPerformance_1 = BrowserPerformance_1_1;
            }],
        execute: function() {
            HeimdallrProvider = (function () {
                function HeimdallrProvider(provider, httpProvider) {
                    this.p = provider;
                    this.hp = httpProvider;
                }
                HeimdallrProvider.prototype.bindHttp = function () {
                    this.setupHttpInterceptor();
                };
                ;
                HeimdallrProvider.prototype.setupHttpInterceptor = function () {
                    this.p.factory('httpInterceptor', ['$q', function ($q) {
                            var bp = new BrowserPerformance_1.BrowserPerformance();
                            return {
                                'request': function (config) {
                                    bp.mark('Start:' + config.url);
                                    return config || $q.when(config);
                                },
                                'response': function (response) {
                                    try {
                                        bp.mark('End:' + response.config.url);
                                        bp.measure(response.config.url, 'Start:' + response.config.url, 'End:' + response.config.url);
                                    }
                                    catch (error) {
                                    }
                                    bp.clearMarks('Start:' + response.config.url);
                                    bp.clearMarks('End:' + response.config.url);
                                    return response || $q.when(response);
                                },
                                'requestError': function (rejection) {
                                    try {
                                        bp.measure('RESPONSE ERROR: ' + rejection.config.url, 'Start:' + rejection.config.url, 'End:' + rejection.config.url);
                                    }
                                    catch (error) {
                                    }
                                    bp.clearMarks('Start:' + rejection.config.url);
                                    bp.clearMarks('End:' + rejection.config.url);
                                    return $q.reject(rejection);
                                },
                                'responseError': function (rejection) {
                                    try {
                                        bp.measure('RESPONSE ERROR: ' + rejection.config.url, 'Start:' + rejection.config.url, 'End:' + rejection.config.url);
                                    }
                                    catch (error) {
                                    }
                                    bp.clearMarks('Start:' + rejection.config.url);
                                    bp.clearMarks('End:' + rejection.config.url);
                                    return $q.reject(rejection);
                                }
                            };
                        }]);
                    this.hp.interceptors.push('httpInterceptor');
                };
                ;
                return HeimdallrProvider;
            }());
            exports_1("HeimdallrProvider", HeimdallrProvider);
        }
    }
});
//# sourceMappingURL=HeimdallrProvider.js.map