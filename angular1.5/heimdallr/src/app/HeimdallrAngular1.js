System.register(["./Heimdallr", "./HeimdallrProvider"], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Heimdallr_1, HeimdallrProvider_1;
    var HeimdallrService, CustomHeimdallr;
    return {
        setters:[
            function (Heimdallr_1_1) {
                Heimdallr_1 = Heimdallr_1_1;
            },
            function (HeimdallrProvider_1_1) {
                HeimdallrProvider_1 = HeimdallrProvider_1_1;
            }],
        execute: function() {
            HeimdallrService = angular.module('HeimdallrService', []);
            CustomHeimdallr = (function (_super) {
                __extends(CustomHeimdallr, _super);
                function CustomHeimdallr($rootScope) {
                    var _this = this;
                    _super.call(this, $rootScope);
                    var watcherPush = function () {
                        _this.rumData.watcherCount = _this.$rootScope.$$watchersCount;
                        _this.rumData.angularVersion = angular.version.full;
                    };
                    this.customFunctions.push(watcherPush);
                }
                return CustomHeimdallr;
            }(Heimdallr_1.Heimdallr));
            exports_1("CustomHeimdallr", CustomHeimdallr);
            CustomHeimdallr.$inject = ["$rootScope"];
            HeimdallrService.service('HeimdallrService', CustomHeimdallr);
            HeimdallrService.provider('Heimdallr', ['$provide', '$httpProvider', function ($provide, $httpProvider) {
                    var heimdallr = new HeimdallrProvider_1.HeimdallrProvider($provide, $httpProvider);
                    return {
                        $get: function () {
                            return heimdallr;
                        }
                    };
                }]);
            exports_1("Heimdallr", Heimdallr_1.Heimdallr);
            exports_1("HeimdallrService", HeimdallrService);
            exports_1("HeimdallrProvider", HeimdallrProvider_1.HeimdallrProvider);
        }
    }
});
//# sourceMappingURL=HeimdallrAngular1.js.map