// PROBLEM 1
console.log(first_variable);
var first_variable = "Yipee I was first!";
function firstFunc() {
  first_variable = "Not anymore!!!";
  // console.log(first_variable);
}
console.log(first_variable)
firstFunc()
console.log(first_variable)
console.log('First problem finished!!!')

// var first_varible;
// function firstFunc(){
//   first_variable = 'Not Anymore!!!';
//   console.log(first_variable)
// }

// console.log(first_varible)
// first_varible = 'Yipee I was first!'
// console.log(first_varible)

// Output: undefined, 'Yipee I was first!'

var food = "Chicken";
function eat() {
  food = "half-chicken";
  console.log(food);
  var food = "gone";       // CAREFUL!
  console.log(food);
}
eat();
console.log(food);
console.log('Second problem finished!!!')

// var food;
// function ear(){
//   food = 'half-chicken';
//   console.log(food);
//   var food;
//   food = 'gone';
// }
//
// food = 'Chicken';
// eat();
// console.log(food);

// OUTPUT:
// Line 1: 'half-chicken'
// Line 2: 'gone'
// LIne 3: 'gone'     I WAS WRONG: 'chicken'

var new_word = "NEW!";
function lastFunc() {
  new_word = "old";
}
console.log(new_word);

// var new_word:
// function lastFunc(){
//   new_word = 'old'
// }
//
// new_word = 'NEW'
// console.log(new_world)
//
// OUTPUT:
// Line 1: 'NEW'
