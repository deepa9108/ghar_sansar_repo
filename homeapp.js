var app = angular.module('homeApp', ['LocalStorageModule', 'ngRoute' ,'ngGoogleMaps']);
app.controller('homeCtrl', function($scope, $http, localStorageService){
	
$scope.map = {
                options: {
                    center: {position: {lat: 43.9124, lng: 75.7873}},
                    zoom: 10
                },
                markers: [{
                    title: 'Marker',
                    position: {lat: 18.5204303, lng: 73.8567437}
                }]
            };  

    
    $scope.mobile;
	$scope.password;

	$scope.loginText = 'Login';

	$scope.login = function(){
		var params = $.param({
                mobile: $scope.mobile,
                password: $scope.password
            });
		$http({
        		method : "POST",
        		url : "http://localhost/dipa/web_service/DB_login.php",
        		data: params,
        		headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
    		}).then(function mySuccess(response) {
                $scope.loginModel = false;
        		$scope.loginText = 'Logout';
        		// store user info in local storage
                localStorageService.set('user',JSON.stringify(response.data.user));
        		console.log('status code', response.data.user);


    		}, function myError(response) {
        		console.log('status code', response.statusText);
    		});
	}

    $scope.fname;
    $scope.lname;
    $scope.email;
    $scope.mobile;
    $scope.address;
    $scope.password;
    $scope.register=function()
    {
        if($scope.password===$scope.cpassword){
        var params=$.param({fname:$scope.fname,
                            lname:$scope.lname,
                            email:$scope.email,
                            mobile:$scope.mobile,
                            address:$scope.address,
                            password:$scope.password
                          });
        $http({
                method : "POST",
                url : "http://localhost/dipa/web_service/DB_register.php",
                data : params,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            }).then(function mySuccess(response) {
                $scope.signUpModel = false;
                $scope.loginModel = true;
                console.log('status code', response.data);
            }, function myError(response) {
                console.log('status code', response.statusText);
            });
            
        } else {
            alert("Password not match..");
        }
    }

    $scope.readJson = function(){
        alert(localStorageService.get('user'));
    }

	$scope.logout = function(){
        localStorageService.remove('user');
		if ($scope.loginText == 'Logout') {
			$scope.loginText = 'Login'
		}
	}

});

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html"
    })
    .when("/contact", {
        templateUrl : "contact.html"
    })
    .when("/about", {
        templateUrl : "aboutus.html"
    });
});



