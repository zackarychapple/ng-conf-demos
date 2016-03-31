System.register([], function(exports_1) {
    "use strict";
    var HeimdallrHttp;
    return {
        setters:[],
        execute: function() {
            HeimdallrHttp = (function () {
                function HeimdallrHttp() {
                }
                HeimdallrHttp.prototype.post = function (url, data, callback) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', url, true);
                    xhr.send(data);
                    if (callback) {
                        callback();
                    }
                };
                HeimdallrHttp.prototype.getSize = function (url) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('HEAD', url, false);
                    xhr.send(null);
                    if (xhr.status === 200) {
                        return parseInt(xhr.getResponseHeader('content-length'));
                    }
                };
                return HeimdallrHttp;
            }());
            exports_1("HeimdallrHttp", HeimdallrHttp);
        }
    }
});
//# sourceMappingURL=HeimdallrHttp.js.map