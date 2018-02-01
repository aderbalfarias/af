afApp.service("emailService", function ($http) {

    this.getEmail = function (id) {
       var req = $http.get("/api/Email/" + id);
       return req;
    };
    var serverUrl = "http://aderbalfarias.com";

    this.getAllEmail = function () {
        var req = $http.get(serverUrl + "/api/Email");
        return req;
    }

    this.postEmail = function (entity) {
        //return = $http.post(serverUrl + "/api/Email/AfContato", data);
        return $http({
            method: "POST",
            url: serverUrl + "/api/Email/AfContato",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            //withCredentials: true,
            data: JSON.stringify(entity),
            dataType: "json"
        });
    };
});