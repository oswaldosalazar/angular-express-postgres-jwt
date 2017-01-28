angular.module('jwt-prototype')
.controller('login.controller.js', function ($scope, $http, $location) {
  $scope.create = (form) => {
    const user = {
      username: form.createAccount.username,
      password: form.createAccount.password
    }

    $http.post('/users/create', user)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        $location.path('/dashboard');
      })
      .catch((err) => {
        console.error(err);
      })
  }

  $scope.loginSubmitted = (form) => {
    console.log('login form submitted');
    console.log(form.login.username);
    console.log(form.login.password);
    const user = {
      username: form.login.username,
      password: form.login.password
    }
    console.log("User from login ctr: ", user);

    $http.post('/users/login', user)
      .then((res) => {
        console.log("In login Angular: ", res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        $location.path('/dashboard');
      })
      .catch((err) => {
        console.error(err);
      })

  }
})
