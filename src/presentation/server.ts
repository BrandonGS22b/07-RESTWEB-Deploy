import express from 'express';
import path from 'path';

interface Options {
    PORT: number;
    PUBLIC_PATH: string;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options: Options) {
        const { PORT, PUBLIC_PATH } = options;
        this.port = PORT;
        this.publicPath = PUBLIC_PATH;
    }

    async start() {
        // Middleware
        this.app.use(express.static(this.publicPath));

        // Routes
        this.app.get('/', (req, res) => {
            console.log(req.url);
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });

        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }
}