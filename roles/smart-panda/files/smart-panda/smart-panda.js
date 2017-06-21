var http = require('http');
var config = require('./config.json');
var HttpDispatcher = require('httpdispatcher');
var dispatcher = new HttpDispatcher();

// global parameter that will be used for counting
var counter = 0;

function handleRequest(request, response){
    try {
        console.log("Requested URL: " + request.url);
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

// on GET request, I will print the counter 
dispatcher.onGet("/", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Till now we had ' + counter + ' POST requests');
});

// on POST request, I will increase the counter by 1
dispatcher.onPost("/", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    counter++;
    res.on('data', function (counter) {
        callback(counter);
        });
});

dispatcher.onError(function(req, res) {
        res.writeHead(404);
        res.end("404 - Page Does not exists");
});

http.createServer(handleRequest).listen(config.port, function(){
    console.log("Server listening on: http://localhost:%s", config.port);
});
