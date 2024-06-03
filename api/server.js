const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Your database file
const middlewares = jsonServer.defaults();

server.use(router);
server.use(middlewares);

server.listen(3000, () => {
	console.log('Servidor Rodando :)');
});
