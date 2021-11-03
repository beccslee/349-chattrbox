const http = require('http');
const fs = require('fs');
const path = require('path');
const extract = require('./extract');
const wss = require('./websockets-server');

const handleError = (err, res) => {
	res.writeHead(404);
	res.end();
}

const server = http.createServer((req, res) => {
	console.log('Responding to a request.');
	
	const filePath = extract(req.url);
	fs.readFile(filePath, (err, data) => {
		if (err) {
			handleError(err, res);
			return;
		} else {
			res.setHeader('Content-Type', 'text/html');
			res.end(data);
		}
	});
});

server.listen(3000);