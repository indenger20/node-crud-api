import HttpStatusCodes from '../../shared/constants/httpStatusCodes';
import { RequestResult } from '../../shared/httpServer/types';
import UserService from './user.service';

class UserController {
  static async findAll(): Promise<RequestResult> {
    // const result = await UserService.findAll();
    return {
      actionResult: [],
      statusCode: HttpStatusCodes.OK,
    };
  }
}

export default UserController;
