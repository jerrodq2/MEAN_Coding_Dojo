// get the http module:
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');
// creating a server using http module:
var server = http.createServer(function (request, response){
    // see what URL the clients are requesting:
    console.log('client request URL: ', request.url);
    // this is how we do routing:
    if(request.url == '/cars') {
        fs.readFile('views/cars.html', 'utf8', function (errors, contents){
          console.log('SECOND *********')
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!

        });
    } else if(request.url == '/cats') {
        fs.readFile('views/cats.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    } else if(request.url == '/cars/new') {
        fs.readFile('views/cars_new.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    } else if(request.url == '/images/dog.jpeg' || request.url == '/images/car.jpeg') {
        var image = request.url.substring(8)
        fs.readFile('./images/'+ image, function (errors, contents){
            response.writeHead(200, {'Content-Type': 'image/jpg'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    } else if(request.url == '/images/cat.jpeg' || request.url == '/images/cat1.jpeg') {
        var image = request.url.substring(8)
        fs.readFile('./images/'+image, function (errors, contents){
            response.writeHead(200, {'Content-Type': 'image/jpg'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    // request didn't match anything:
    else {
        response.writeHead(404);
        response.end('File not found!!!');
    }
});
// tell your server which port to run on
server.listen(8000);
// print to terminal window
console.log("Running in localhost at port 8000");
