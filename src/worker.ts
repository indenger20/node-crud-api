import HttpServer from './shared/httpServer';
import Router from './shared/httpServer/router';
import userRoutes from './components/users/user.routes';

const router = new Router();
router.setApiPath('/api');

userRoutes(router);

const server = new HttpServer({ router });

server.listen(Number(3000));
