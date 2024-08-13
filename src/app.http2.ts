// Importa el módulo 'http2' para crear el servidor web en HTTPS
import http2 from 'http2';
// Importa el módulo 'fs' para trabajar con el sistema de archivos
import fs from 'fs';
// Importa el módulo 'path' para manejar rutas de archivos
import path from 'path';

// Crea un servidor HTTP/2 seguro
const server = http2.createSecureServer({
    key: fs.readFileSync(path.resolve(__dirname, '../Keys/server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '../Keys/server.cert')),
}, (req, res) => {
    // Imprime la URL de la solicitud en la consola
    console.log(req.url);

    // Construye la ruta del archivo basado en la URL solicitada
    let filePath = './public' + req.url;

    // Si la URL es la raíz ("/"), sirve el archivo 'index.html'
    if (req.url === '/') {
        filePath = './public/index.html';
    }

    // Lee el archivo especificado de forma asíncrona
    fs.readFile(filePath, 'utf-8', (err, fileContent) => {
        if (err) {
            // Si hay un error al leer el archivo, responde con un error 500
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end("<h1>500 Internal Server Error</h1>");
            return;
        }

        // Determina el tipo de contenido basado en la extensión del archivo
        const extname = path.extname(filePath);
        let contentType = 'text/html';
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.ico':
                contentType = 'image/x-icon';
                break;
            // Agrega más tipos de contenido si es necesario
        }

        // Responde con el contenido del archivo y el tipo de contenido correspondiente
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(fileContent);
    });
});

// Hace que el servidor escuche en el puerto 8080 y muestra un mensaje en la consola cuando el servidor esté en funcionamiento
server.listen(8080, () => {
    console.log("Server running on port 8080");
});

// Código comentado para ejemplos anteriores
console.log("hola brandon");
