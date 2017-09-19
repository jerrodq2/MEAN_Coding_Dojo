function VehicleConstructor(name, numberOfWheels, numberOfPassengers){
  var vehicle = {
    name: name,
    numberOfWheels: numberOfWheels,
    numberOfPassengers: numberOfPassengers,
    makeNoise: function(){},
  }
  return vehicle;
}
var bike = VehicleConstructor('Bike', 2, 0);
bike.makeNoise = function(){console.log('ring ring!')};
bike.makeNoise()

var sedan = VehicleConstructor('Sedan', 4, 0);
sedan.makeNoise = function(){console.log('Honk Honk!')};

var bus = VehicleConstructor('bus', 4, 0);
bus.addPass = function(num){
  bus.numberOfPassengers += num;
}
