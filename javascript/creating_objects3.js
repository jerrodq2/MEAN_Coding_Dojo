function VehicleConstructor(name, numberOfWheels, numberOfPassengers, speed){
    // var updateDistanceTravelled = function(){
    //   this.distance_travelled += this.speed;
    // }
    this.name = name
    this.numberOfWheels = numberOfWheels
    this.numberOfPassengers = numberOfPassengers
    this.speed = speed
    this.distance_travelled = 0;
    // this.move = function(){
    //   this.updateDistanceTravelled();
    //   this.makeNoise();
    // }
    // this.checkMiles = function(){console.log(this.distance_travelled)};
}
VehicleConstructor.prototype.makeNoise = function(){}

VehicleConstructor.prototype.updateDistanceTravelled = function(){
  this.distance_travelled += this.speed;
}

VehicleConstructor.prototype.move = function(){
  this.updateDistanceTravelled();
  this.makeNoise();
  return this
}

VehicleConstructor.prototype.checkMiles = function(){console.log(this.distance_travelled); return this};

VehicleConstructor.prototype.makeVin = function(){
  var str = ''
  for (var i = 0; i < 17; i++){
    str += Math.floor(Math.random()*10)
  }
  return str
}

var bike = new VehicleConstructor('Bike', 2, 0, 10);
bike.makeNoise = function(){console.log('ring ring!')};
bike.move().checkMiles()
console.log(bike.makeVin())

var sedan = new VehicleConstructor('Sedan', 4, 0, 10);
sedan.makeNoise = function(){console.log('Honk Honk!')};

var bus = new VehicleConstructor('bus', 4, 0, 10);
bus.addPass = function(num){
  bus.numberOfPassengers += num;
}
