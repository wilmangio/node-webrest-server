"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http2_1 = __importDefault(require("http2"));
const fs_1 = __importDefault(require("fs"));
const server = http2_1.default.createSecureServer({
    key: fs_1.default.readFileSync('./keys/server.key'),
    cert: fs_1.default.readFileSync('./keys/server.crt'),
}, (req, res) => {
    var _a, _b;
    // console.log(req.url);
    // res.writeHead(200, {'Content-Type':'text/html'});
    // res.write('<h1>Hola Mudo</h1>');
    // res.end();
    if (req.url === '/') {
        const htmlFile = fs_1.default.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }
    if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    }
    else if ((_b = req.url) === null || _b === void 0 ? void 0 : _b.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }
    try {
        const responsecontent = fs_1.default.readFileSync(`./public${req.url}`, 'utf-8');
        res.end(responsecontent);
    }
    catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end();
    }
});
server.listen(8080, () => {
    console.log('Server running');
});
