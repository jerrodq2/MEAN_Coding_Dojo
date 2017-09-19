
var wallet = {
  coins: 0,
  dollars: 0,
  total : function(){
    console.log(this.coins+this.dollars);
    return this
  },
  withdraw: function(coins, dollars){
    this.coins -= coins;
    this.dollars -= dollars;
    return this
  },
  deposit : function(coins, dollars){
    this.coins += coins;
    this.dollars += dollars;
    return this
  }
}

var bank = {
    checking: 50,
    saving: 100,
    total : function (){
      console.log(this.checking+this.saving);
      return this
    },
    withdraw : function (amount, account){
      if (account == 'saving'){
        this.saving -= amount;
      } else {
        this.checking -= amount
      }
      return this
    },
    deposit : function(amount, account){
      if (account == 'saving'){
        this.saving += amount;
      } else {
        this.checking += amount
      }
      return this
    }
  }
console.log(bank.total().deposit(100, 'saving').total());
// NO DIRECT DEPOSIT
