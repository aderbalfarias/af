app.controller("email.controller", function ($scope, emailService) {
    //Function to Reset Scope variables
    function initialize() {
        $scope.name = "";
        $scope.from = "";
        $scope.subject = "";
        $scope.body = "";
    }
    
    //Function to Submit the form
    $scope.submitForm = function (isValid) {
        if (isValid) {
            var email = {};
            email.name = $scope.name;
            email.from = $scope.from;
            email.subject = '';
            email.body = $scope.body;

            emailService.postEmail(email)
                .success(function(data) {
                    ShowMessage("Success", "Success", "Email sent with success!", 5);
                    initialize();
                }).error(function() {
                    ShowMessage("Error", "Error", "Ocorreu um erro inesperado: " + error, 5);
                });
        }
    };
});