import Router from '../../shared/httpServer/router';
import UserController from './user.controller';

const userRoutes = (router: Router) => {
  router.get('/users', UserController.findAll);

  router.post('/users', async (req, res) => {
    console.log('POST users');
    return {
      actionResult: [],
      statusCode: 200,
    };
  });

  router.get('/admin/users', async (req, res) => {
    console.log('req from controller');
    return {
      actionResult: [],
      statusCode: 200,
    };
  });
};

export default userRoutes;
