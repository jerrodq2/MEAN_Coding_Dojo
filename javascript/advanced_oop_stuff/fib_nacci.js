function fib(){
  var first = 0;
  var second;
  var sum = 0;
  function nacci(){
    if (second == null){
      second = 1;
      sum = first + second;
    } else{
      sum = first + second;
      var temp = second;
      second = sum;
      first = temp;
    }
    return sum;
  }
  return nacci;
}
var fibCounter = fib();
console.log(fibCounter())
console.log(fibCounter())
console.log(fibCounter())
console.log(fibCounter())
console.log(fibCounter())
console.log(fibCounter())
