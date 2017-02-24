// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
       
    .when('/:arm', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
       
});

// DIRECTIVES

// Enter-key directive

weatherApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});



// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$http', function($scope, $http) {
    
    $scope.city = '';
    $scope.myShow = false;
    
    $scope.toggle = function () {
        $scope.myShow = true;
        
        /* ----------------API----------------*/
    
    var apikey= '30866e765db0fc26fc53ced8c1298f7c';
       
    var getAPI = $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + $scope.city + '&units=imperial&APPID=' + apikey)
        .success(function (result) {
        
        console.log(result);
        
        $scope.location = result.name + ", " + result.sys.country;
        $scope.description = result.weather[0].description;    
        $scope.temp = result.main.temp;
        $scope.pressure = result.main.pressure + ' HPA';
        $scope.humidity = result.main.humidity + '%';
            
        
    })
    .error(function (data, status) {
        console.log(data);
    });
    
    }
  
}]);

