var app = angular.module('myApp', ['ngRoute'])

app.config(function ($routeProvider) {

$routeProvider
  .when('/dashboard', {
    templateUrl: 'partials/dashboard.html'
  })
  .when('/products', {
    templateUrl: 'partials/products.html'
  })
  .when('/orders', {
    templateUrl: 'partials/orders.html'
  })
  .when('/customers', {
    templateUrl: 'partials/customers.html'
  })
  .when('/editOrders/:id', {
    templateUrl: 'partials/editOrders.html'
  })
  .otherwise('/dashboard')
})


// *******************End*******************



//   // Setting a cookie
//   $cookies.put('myFavorite', 'oatmeal')
//    // Retrieving a cookie
//   var favoriteCookie = $cookies.get('myFavorite')
//    // Removing cookie
//    $cookies.remove('myFavorite')
