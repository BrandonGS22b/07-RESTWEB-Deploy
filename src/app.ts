import { Server } from './presentation/server';
import { envs } from './config/env';

(async () => {
    main();
})();

function main() {
    const server = new Server({
        PORT: envs.PORT,  // Cambiado de 'port' a 'PORT'
        PUBLIC_PATH: envs.PUBLIC_PATH,  // Cambiado de 'public_path' a 'PUBLIC_PATH'
    });

    server.start();

    console.log('Hello Worldd');
}
