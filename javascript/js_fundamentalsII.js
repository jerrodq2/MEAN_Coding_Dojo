function sum(a, b){
  var sum = 0;
  if (a < b){
    for (var i = a; i <= b; i++){
      sum += i;
    }
  } else {
    for (var i = b; i <= a; i++){
      sum += i;
    }
  }
  return sum;
}
// var sum = function (a, b){
//   var sum = 0;
//   if (a < b){
//     for (var i = a; i <= b; i++){
//       sum += i;
//     }
//   } else {
//     for (var i = b; i <= a; i++){
//       sum += i;
//     }
//   }
//   return sum;
// }

function min(arr){
  var min = arr[0];
  for (var i = 0; i < arr.length; i++){
    if (arr[i] < min){
      min = arr[i];
    }
  }
  return min;
}
// var min = function (arr){
//   var min = arr[0];
//   for (var i = 0; i < arr.length; i++){
//     if (arr[i] < min){
//       min = arr[i];
//     }
//   }
//   return min;
// }

function avg(arr){
  var avg = 0;
  for (var i = 0; i < arr.length; i++){
    avg += arr[i];
  }
  return avg/arr.length;
}
// var avg = function (arr){
//   var avg = 0;
//   for (var i = 0; i < arr.length; i++){
//     avg += arr[i];
//   }
//   return avg/arr.length;
// }

var obj = {
  name : 'Jerrod',
  distance_travelled : 0,
  say_name : function() {
    console.log(obj.name)
  },
  say_something : function(str) {
    obj.name = str
  },
  walk: function(){
    console.log(obj.name + ' is walking');
    obj.distance_travelled += 3;
  },
  running: function(){
    console.log(obj.name + ' is running');
    obj.distance_travelled += 10;
  },
  crawl: function(){
    console.log(obj.name + ' is crawling');
    obj.distance_travelled += 1;
  }
}
console.log(obj)
obj.say_name()
obj.say_something('Jack')
obj.walk()
obj.running()
obj.crawl()
console.log(obj)
