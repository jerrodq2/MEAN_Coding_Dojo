var app = angular.module('myApp', ['ngRoute']);


app.factory('playerFact', function(){
  var factory = {};
  var players = ['Speros', "Jimmy", 'Sam', "Jay"];
  factory.show = function(callback){
    callback(players);
  }
  factory.add = function(name){
    players.push(name);
  }
  factory.delete = function(index){
    players.splice(index, 1);
  }
  return factory;
})


app.factory('teamFact', function(){
  var factory = {};
  var teams = ['Seahawks', '49ers', 'Honebadgers'];
  factory.show = function(callback){
    callback(teams);
  }
  factory.add = function(name){
    teams.push(name);
  }
  factory.delete = function(index){
    teams.splice(index, 1);
  }
  var associations = [
    {player: 'Speros', team: 'Seahawks'},
    {player: 'Jimmy', team: 'Seahawks'},
    {player: 'Sam', team: 'Honebadgers'},
  ]
  factory.associate = function(callback){
    callback(associations);
  }
  factory.newAssociation = function(data){
    associations.push(data);
  }
  factory.deleteAssociation = function(index){
    associations.splice(index, 1);
  }
  factory.playerDeleted = function(name){
    for (var i in associations){
      if(associations[i].player == name){
        associations.splice(i, 1);
      }
    }
  }
  factory.teamDeleted= function(name){
    for (var i in associations){
      if(associations[i].team == name){
        associations.splice(i, 1);
      }
    }
  }
  return factory;
})
