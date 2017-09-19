app.controller('playerControl', function(playerFact, teamFact){
  var self = this;
  this.players = [];
  playerFact.show(function(data){
    self.players = data;
  })
  this.add = function(){
    playerFact.add(this.name);
    this.name=''
  }
  this.delete = function(index, name){
    playerFact.delete(index);
    teamFact.playerDeleted(name);
  }
})



app.controller('teamControl', function(teamFact){
  var self = this;
  this.teams = [];
  this.associations=[];
  teamFact.show(function(data){
    self.teams = data;
  })
  teamFact.associate(function(data){
    self.associations = data;
  })
  this.add = function(){
    teamFact.add(this.name);
    this.name=''
  }
  this.delete=function(index, name){
    teamFact.delete(index);
    teamFact.teamDeleted(name);
  }
  this.newAssociation = function(){
    teamFact.newAssociation(this.newAssignment);
    this.newAssignment = {};
  }
  this.deleteAssociation = function(index){
    teamFact.deleteAssociation(index);
  }
})
