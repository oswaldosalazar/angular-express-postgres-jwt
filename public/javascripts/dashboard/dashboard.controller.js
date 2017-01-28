angular.module('jwt-prototype')
  .controller('dashboard', function ($scope, $location) {
    $scope.user = JSON.parse(localStorage.getItem('user'))

    if(!$scope.user) {
      $location.path('/')
    }
    console.log("User from dashboard: ", $scope.user);
    $scope.name = $scope.user.username
  })
