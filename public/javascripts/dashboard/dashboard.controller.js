angular.module('jwt-prototype')
  .controller('dashboard', function ($scope, $location) {
    $scope.user = JSON.parse(localStorage.getItem('user'))

    if(!$scope.user) {
      $location.path('/')
    }
    
    $scope.test = $scope.user.username
  })
