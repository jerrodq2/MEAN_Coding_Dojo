var _ = {
   map: function(arr, func) {
     var newarr = [];
     for (var i = 0; i < arr.length; i++){
       newarr.push(func(arr[i]))
     }
     return newarr;

   },
   reduce: function(arr, func) {
     var end = 0;
     for (var i = 0; i < arr.length - 1; i++){
       end += func(arr[i])
     }
     return end;

   },
   find: function(arr, func) {
     var answer = [];
     for (var i = 0; i < arr.length; i++){
       if (func(arr[i]) == true){
         answer.push(arr[i]);
         return answer;
       }
     }
   },
   filter: function(arr, func) {
     var answer = [];
     for (var i = 0; i < arr.length; i++){
       if (func(arr[i]) == true){
         answer.push(arr[i]);
       }
     }
     return answer
   },
   reject: function(arr, func) {
     var answer = [];
     for (var i = 0; i < arr.length; i++){
       if (func(arr[i]) != true){
         answer.push(arr[i]);
       }
     }
     return answer
   }
 }
// you just created a library with 5 methods!
// var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// var evens = _.map([1,2,3,4,5,6], function(num){return num * 2})
// var evens = _.reduce([1,2,3], function(num){ return num + num})
// var evens = _.find([1,2,3,4,5], function(num){return num % 2 == 0})
// var evens = _.filter([1,2,3,4,5], function(num){return num % 2 == 0})
// var evens = _.reject([1,2,3,4,5], function(num){return num % 2 == 0})
console.log(evens); // if things are working right, this will return [2,4,6].
