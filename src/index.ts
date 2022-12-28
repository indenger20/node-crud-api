import * as dotenv from 'dotenv';

import HttpServer from './shared/httpServer';
import Router from './shared/httpServer/router';

dotenv.config();

const { API_PORT = 3000 } = process.env;

const router = new Router();

router.setApiPath('/api');

router.get('/users', async (req, res) => {
  console.log('GET users');
  return {
    actionResult: [],
    statusCode: 200,
  };
});

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

const server = new HttpServer({ router });

server.listen(Number(API_PORT));
