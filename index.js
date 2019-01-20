/*
 * First NodeJS MasterClass Homework
 * Author: Germán Rodríguez
 */

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

// Server configuration
var server = http.createServer(function (req, res) {

    // Skipping favicon.ico request
    if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
        console.log('favicon requested');
        return;
    }

    // Any other path will get parsed
    var parsedUrl = url.parse(req.url, true);

    // Get the path
    var handlerPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

    // Get the payload,if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('error', function (err) {
        // Simple error handling
        console.error(err);
    }).on('data', function (data) {
        // Parsing body data
        buffer += decoder.write(data);
    }).on('end', function () {
        // Trying to answer request
        buffer += decoder.end();

        // Match the route to either helloWorld or notFound
        var chosenHandler = typeof (router[handlerPath]) !== 'undefined' ?
            router[handlerPath] : handlers.notFound;

        // Route the request to the handler specified in the router
        chosenHandler(function (statusCode, payload) {
            // Return the response
            res.writeHead(statusCode);
            res.end(JSON.stringify(payload));
        });
    });
});

// Start the server
server.listen(3000, function () {
    console.log('The server is up and running now');
});

// Define all the handlers
var handlers = {};

// Not found handler
handlers.notFound = function (callback) {
    callback(
        404,
        { 'message': "Sorry, can't find that route :(" }
    );
};

// Homework Handler
handlers.helloWorld = function (callback) {
    callback(
        200,
        { 'message': 'Hello world! this is a message for my fisrst pirple node homework' }
    );
};

// Request router
var router = {
    'hello': handlers.helloWorld
};