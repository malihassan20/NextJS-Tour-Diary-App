const routes = (module.exports = require('next-routes')());

routes.add('index', '/');
routes.add('tour-detail', '/tour-detail/:tourId');
