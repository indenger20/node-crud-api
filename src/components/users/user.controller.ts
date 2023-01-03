import cluster from 'cluster';
import HttpStatusCodes from '../../shared/constants/httpStatusCodes';
import { RequestResult } from '../../shared/httpServer/types';
import UserService from './user.service';

class UserController {
  static async findAll(): Promise<RequestResult> {
    // const result = await UserService.findAll();

    console.log('cluster.worker?.id', cluster.worker?.id);
    return {
      actionResult: [],
      statusCode: HttpStatusCodes.OK,
    };
  }

  static async create(): Promise<RequestResult> {
    return {
      actionResult: [],
      statusCode: HttpStatusCodes.OK,
    };
  }
}

export default UserController;
