module.exports = function(){
  return {
    add: function(a, b){
      return a+b;
    },
    multiply: function(a, b){
      return a*b;
    },
    square: function(num){
      return num*num;
    },
    random: function(a, b){
      return Math.floor(Math.random() * (b - a + 1)) + a
    }
  }
};
