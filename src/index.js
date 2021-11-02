///'use strict';
// Iniciar conexão com o mongo
require('./services/mongo');

const Hapi = require('@hapi/hapi');
// Importar rotas
const routes = require('./routes')


const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();