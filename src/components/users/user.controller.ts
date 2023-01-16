/* eslint-disable @typescript-eslint/no-non-null-assertion */
import HttpStatusCodes from '../../shared/constants/httpStatusCodes';
import HttpNotFoundError from '../../shared/errors/http-not-found.error';
import Request from '../../shared/httpServer/Request';
import { RequestResult } from '../../shared/httpServer/types';
import { assertIsArray, assertIsNumeric, assertIsValidUuid, assertNotNull } from '../../shared/validators';
import User, { UserDto } from './user.model';
import userService from './user.service';

class UserController {
  static async findAll(): Promise<RequestResult> {
    const result = await userService.getAll();

    return {
      actionResult: result,
      statusCode: HttpStatusCodes.HTTP_STATUS_OK,
    };
  }

  static async getById(request: Request): Promise<RequestResult> {
    const userId = request.getId()!;

    assertIsValidUuid(userId);

    const user = await userService.findById(userId);

    if (!user) {
      throw new HttpNotFoundError(`User with ID ${userId} not found`);
    }

    return {
      actionResult: user,
      statusCode: HttpStatusCodes.HTTP_STATUS_OK,
    };
  }

  static async create(request: Request<UserDto>): Promise<RequestResult> {
    const userDto = request.getJsonBody();

    if (!userDto) {
      throw new Error('');
    }

    assertNotNull(userDto.username, 'Username should not be empty');
    assertIsNumeric(userDto.age, 'Age should be a valid numeric');
    assertIsArray(userDto.hobbies, 'Hobbies should be an array');

    const createdUser = await userService.create(User.fromDto(userDto));
    return {
      actionResult: createdUser,
      statusCode: HttpStatusCodes.HTTP_STATUS_CREATED,
    };
  }

  static async update(request: Request<User>): Promise<RequestResult> {
    const userId = request.getId()!;
    const userDto = request.getJsonBody();

    assertIsValidUuid(userId);
    assertNotNull(userDto.username, 'Username should not be empty');
    assertIsNumeric(userDto.age, 'Age should be a valid numeric');
    assertIsArray(userDto.hobbies, 'Hobbies should be an array');

    const user = await userService.findById(userId);

    if (!user) {
      throw new HttpNotFoundError(`User with ID ${userId} not found`);
    }

    const updatedUser = await userService.update(userId, User.fromDto(userDto));

    return {
      actionResult: updatedUser,
      statusCode: HttpStatusCodes.HTTP_STATUS_OK,
    };
  }

  static async delete(request: Request): Promise<RequestResult> {
    const userId = request.getId()!;

    assertIsValidUuid(userId);

    const deleted = await userService.delete(userId);

    if (!deleted) {
      throw new HttpNotFoundError(`User with ID ${userId} not found`);
    }

    return {
      actionResult: null,
      statusCode: HttpStatusCodes.HTTP_STATUS_NO_CONTENT,
    };
  }
}

export default UserController;
