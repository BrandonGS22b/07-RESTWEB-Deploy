"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa el módulo 'http' para crear el servidor web
const http_1 = __importDefault(require("http"));
// Importa el módulo 'fs' para trabajar con el sistema de archivos
const fs_1 = __importDefault(require("fs"));
// Crea un servidor HTTP
const server = http_1.default.createServer((req, res) => {
    // Imprime la URL de la solicitud en la consola
    console.log(req.url);
    // Código comentado para ejemplos anteriores
    // res.write('hola mundo');
    // res.end();
    /*
    // Datos de ejemplo en formato JSON
    const data = {name:'jhon doe',age:30,city:'new york'};
    // Establece el encabezado de respuesta y el tipo de contenido como JSON
    res.writeHead(200, {'Content-Type': 'application/json'});
    // Envía la respuesta en formato JSON
    res.end(JSON.stringify(data));
    */
    // Verifica si la URL solicitada es la raíz ("/")
    if (req.url === '/') {
        // Lee el archivo 'index.html' en la carpeta 'public' de forma asíncrona
        fs_1.default.readFile('./public/index.html', 'utf-8', (err, htmlFile) => {
            // Si hay un error al leer el archivo, responde con un error 500
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end("<h1>500 Internal Server Error</h1>");
                return;
            }
            // Si no hay errores, responde con el contenido del archivo HTML
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(htmlFile);
        });
    }
    else {
        // Si la URL no es la raíz, responde con un error 404
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("<h1>404 Not Found</h1>");
    }
});
// Hace que el servidor escuche en el puerto 8080 y muestra un mensaje en la consola cuando el servidor esté en funcionamiento
server.listen(8080, () => {
    console.log("Server running on port 8080");
});
// Código comentado para ejemplos anteriores
// console.log("hola brandon")
