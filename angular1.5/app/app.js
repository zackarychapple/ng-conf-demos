'use strict';
var watcherData = [];
var HSVC;

angular.module('app', ['ngComponentRouter', 'dialog', 'heroes', 'crisis-center', 'HeimdallrService', 'ngHintScopes'])
    .config(function ($locationProvider, HeimdallrProvider) {
        $locationProvider.html5Mode(true);
        HeimdallrProvider.$get().bindHttp();
    })
    .run(['HeimdallrService', function (HeimdallrService) {
        HeimdallrService.init({
            url: '/monitoring/perf',
            customProperties: {},
            router: 'ngComponentRouter'
        });
        HSVC = HeimdallrService;
        var getWatcherData = function () {
            HSVC.rumData.customProperties['watcherData'] = watcherData;
            var oldWatcherData = watcherData;
            watcherData = [];
            return oldWatcherData
        };
        HeimdallrService.customFunctions.push(getWatcherData.bind(this));
        HeimdallrService.router.bindRoutingEvents();
        HeimdallrService.performanceTest();
    }])

    .value('$routerRootComponent', 'app')

    .component('app', {
        template: '<nav>\n' +
        '  <a ng-link="[\'CrisisCenter\']">Crisis Center</a>\n' +
        '  <a ng-link="[\'Heroes\']">Heroes</a>\n' +
        '</nav>\n' +
        '<ng-outlet></ng-outlet>\n',
        $routeConfig: [
            {path: '/crisis-center/...', name: 'CrisisCenter', component: 'crisisCenter', useAsDefault: true},
            {path: '/heroes/...', name: 'Heroes', component: 'heroes'}
        ]
    });
angular.module('ngHintScopes', []).config(['$provide', function ($provide) {
    $provide.decorator('$rootScope', ['$delegate', '$parse', decorateRootScope]);
}]);

var buildEvents = function (_digestEvents) {
    var reducedWatches = _digestEvents.reduce(function (prev, next) {
        if (!prev[next.watch]) {
            prev[next.watch] = {
                time: next.time,
                count: 1
            };
        } else {
            prev[next.watch].time += next.time;
            prev[next.watch].count++;
        }
        return prev;
    }, {});
    watcherData = Object.keys(reducedWatches)
        .filter(function (key) {
            return reducedWatches[key].time;
        })
        .map(function (key) {
            return {
                text: key.trim().replace(/\s{2,}/g, ' '),
                time: reducedWatches[key].time,
                count: reducedWatches[key].count
            };
        })
        .sort(function (a, b) {
            return b.time - a.time;
        });
};

var decorateRootScope = function decorateRootScope($delegate, $parse) {
    var scopePrototype = ('getPrototypeOf' in Object) ?
        Object.getPrototypeOf($delegate) : $delegate.__proto__;
    var lastDirtyWatch = null;
    var _digestEvents = [];
    var _digest = scopePrototype.$digest;
    scopePrototype.$digest = function (fn) {
        _digestEvents = [];
        var start = performance.now();
        var ret = _digest.apply(this, arguments);
        var end = performance.now();
        watcherData.push({
            id: this.$id,
            time: end - start,
            events: buildEvents(_digestEvents)
        });
        return ret;
    };
    var _watch = scopePrototype.$watch;
    scopePrototype.$watch = function (watchExp, listener, objectEquality, prettyPrintExpression) {
        var expressions = null;
        var scopeId = this.$id;
        var get = $parse(watchExp);

        if (get.$$watchDelegate) {
            return get.$$watchDelegate(this, listener, objectEquality, get, watchExp);
        }
        var scope = this,
            array = scope.$$watchers,
            watcher = {
                fn: listener,
                last: initWatchVal,
                get: get,
                exp: prettyPrintExpression || watchExp,
                eq: !!objectEquality
            };
        lastDirtyWatch = null;

        if (!isFunction(listener)) {
            watcher.fn = angular.noop;
        }

        if (!array) {
            array = scope.$$watchers = [];
        }
        array.unshift(watcher);
        incrementWatchersCount(this, 1);
        var watchStr = humanReadableWatchExpression(watcher);
        if (typeof watchExp === 'function') {
            expressions = watchExp.expressions;
            if (Object.prototype.toString.call(expressions) === '[object Array]' &&
                expressions.some(isOneTimeBindExp)) {
                return _watch.apply(this, arguments);
            }

            arguments[0] = function () {
                var start = performance.now();
                var ret = watchExp.apply(this, arguments);
                var end = performance.now();
                _digestEvents.push({
                    eventType: 'scope:watch',
                    id: scopeId,
                    watch: watchStr,
                    time: end - start
                });
                return ret;
            };
        } else {
            var thatScope = this;
            arguments[0] = function () {
                var start = performance.now();
                var ret = thatScope.$eval(watchExp);
                var end = performance.now();
                _digestEvents.push({
                    eventType: 'scope:watch',
                    id: scopeId,
                    watch: watchStr,
                    time: end - start
                });
                return ret;
            };
        }
        return _watch.apply(this, arguments);
    };

    return $delegate;
};


function initWatchVal() {
}

var isFunction = function isFunction(value) {
    return typeof value == 'function';
};
var isPromiseLike = function isPromiseLike(obj) {
    return obj && isFunction(obj.then);
};
var isObject = function isObject(value) {
    return value != null && typeof value === 'object';
};
var isUndefined = function isUndefined(value) {
    return typeof value === 'undefined';
};


function incrementWatchersCount(current, count) {
    do {
        current.$$watchersCount += count;
    } while ((current = current.$parent));
}


function humanReadableWatchExpression(fn) {
    if (fn == null) {
        return null;
    }
    if (fn.exp) {
        fn = fn.exp;
    } else if (fn.name) {
        fn = fn.name;
    }
    return fn.toString();
}

function isOneTimeBindExp(exp) {
    // this is the same code angular 1.3.15 has to check
    // for a one time bind expression
    return exp.charAt(0) === ':' && exp.charAt(1) === ':';
}
