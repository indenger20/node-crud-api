import Router from '../../shared/httpServer/router';
import UserController from './user.controller';

const userRoutes = (router: Router) => {
  router.get('/users', UserController.findAll);

  router.post('/users', UserController.create);
};

export default userRoutes;
