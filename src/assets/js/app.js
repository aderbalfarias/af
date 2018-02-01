var app;
(function () {
    app = angular.module("app", []);

    app.config(function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        delete $httpProvider.defaults.headers.common["Access-Control-Request-Method"];
        delete $httpProvider.defaults.headers.common["Access-Control-Request-Headers"];
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
    });
})();