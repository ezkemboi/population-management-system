const http = require("http");

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
    res.statusCode(200);
    res.setHeader('Content-Type', 'application/json');
    res.end({ message: "Successfully set up first NodeJS app." });
});

server.listen(port, hostname, () => {
    console.log(`Server is listening to http://${hostname}:${port}`);
});
