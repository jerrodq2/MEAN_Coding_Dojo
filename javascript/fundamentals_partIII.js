function personConstructor(name){
  var obj = {
    name : name,
    distance_travlled: 0,
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
  return obj
}
var jay = personConstructor('jay')
console.log(jay)

function ninjaConstructor(name){
  var obj = {
    name: name,
    belt_level: 'yellow',
    cohort: 'first',
    levelUp: function(){
      obj.belt_level = 'red'
    }
  }
  return obj
}
var ninja = ninjaConstructor('smith')
console.log(ninja)
