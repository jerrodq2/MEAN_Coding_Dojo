function VehicleConstructor(name, numberOfWheels, numberOfPassengers, speed){
    var self = this;
    var distance_travelled = 0;
    var updateDistanceTravelled = function(){
      distance_travelled += self.speed;
    }

    this.name = name
    this.numberOfWheels = numberOfWheels
    this.numberOfPassengers = numberOfPassengers
    this.makeNoise = function(){}
    this.speed = speed
    this.move = function(){
      updateDistanceTravelled();
      this.makeNoise();
    }
    this.checkMiles = function(){console.log(distance_travelled)};
    console.log(self)
    console.log(this)

}
var bike = new VehicleConstructor('Bike', 2, 0, 10);
bike.makeNoise = function(){console.log('ring ring!')};
bike.move()
bike.checkMiles()

var sedan = new VehicleConstructor('Sedan', 4, 0, 10);
sedan.makeNoise = function(){console.log('Honk Honk!')};

var bus = new VehicleConstructor('bus', 4, 0, 10);
bus.addPass = function(num){
  bus.numberOfPassengers += num;
}
