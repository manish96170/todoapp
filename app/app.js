var app2 = angular.module('app',['ngRoute','ngAnimate']);

app2.directive('randomNinja',[function(){
return {
    restrict: 'E',
    scope: {
        ninjas: '=',
        title: '='
    },
    templateUrl: 'app/templates/random.html',
    transclude: true,
    replace: true,
    controller: function($scope){
        $scope.random = Math.floor(Math.random()*4);
    }
};

}]);

app2.factory("messageService", function($q){

        return { 
            getMessage : function(){
            return $q.when("Hello World!");
        }
    };
   
});


app2.config(['$routeProvider' , '$locationProvider', function($routeProvider, $locationProvider,messageService){

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/home', {
            templateUrl: 'app/templates/home.html',
           // only work in angl2 template: '<h3 [innerText]="name"></h3>',
            controller: 'NinjaController'
        })
        .when('/contact',{
            templateUrl: 'app/templates/contact.html',
            controller: 'ContactController',
            controllerAs: 'contCntrl'
        })
        .when('/contact-success',{
            templateUrl: 'app/templates/contact-success.html'
        })
        .when('/directory',{
            templateUrl:'app/templates/directory.html',
            controller: 'NinjaController'
         })
         .when('/msgview', {
            templateUrl: 'app/templates/msg-view.html',
            controller: 'MessageController',
            resolve: {
                message: function(messageService){
                    return messageService.getMessage();
            }
            }
         })
        .otherwise({
            redirectTo: '/home'
        });
}]);


var ContactController = function ($scope, $location){
    var vm = this;
    vm.a = 10;
    vm.sendMessage = function(){
        $location.path('/contact-success');
    }

};

var NinjaController = function ($scope,$http){
    $scope.name = "Manish sharma";
    
    $scope.removeNinja = function(ninja){
        var removedNinja = $scope.ninjas.indexOf(ninja);
        $scope.ninjas.splice(removedNinja, 1);
    };

    $scope.addNinja = function(){
        $scope.ninjas.push({
            name: $scope.newninja.name,
            belt: $scope.newninja.belt,
            rate: parseInt($scope.newninja.rate),
            available: true
        });
            $scope.newninja.name = "",
            $scope.newninja.belt = "",
            $scope.newninja.rate = ""
    };
          
    function onSuccess(response){
                $scope.ninjas = response.data;
                console.log(response)
            };

    function onError(response){
                alert("Error");
            };


    $scope.removeAll = function(){
                $scope.ninjas = [];
    };        
    
    $http.get('app/data/data.json').then(onSuccess,onError);
        
   


//console.log(angular.toJson($scope.ninjas));
};


var MessageController =  function($scope, message){
        $scope.message = message;
}

app2.controller('MessageController',['$scope' , 'message', MessageController]);
app2.controller('NinjaController',['$scope','$http', NinjaController]);
app2.controller('ContactController', ['$scope','$location' , ContactController])
