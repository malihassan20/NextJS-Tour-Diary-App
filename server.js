const express = require('express');
const next = require('next');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const handler = routes.getRequestHandler(app);

app
	.prepare()
	.then(() => {
		const server = express();
		server.use(handler);

		server.get('/tour-detail/:tour', (req, res) => {
			const actualPage = '/tour-detail';
			const queryParams = { tour: req.params.tour };
			app.render(req, res, actualPage, queryParams);
		});

		server.get('*', (req, res) => handle(req, res));

		server.listen(3000, err => {
			if (err) throw err;
			console.log('> Ready on http://localhost:3000');
		});
	})
	.catch(ex => {
		console.error(ex.stack);
		process.exit(1);
	});
