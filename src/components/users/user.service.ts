import User from './user.model';
import dataBase from '../../shared/db';

class UserService {
  constructor() {
    dataBase.use('users', []);
  }

  async getAll() {
    const users = await dataBase.getAll('users');
    return users;
  }
  async create(user: User) {
    const newUser = await dataBase.create('users', user);
    return newUser;
  }

  async findById(id: string) {
    const user = await dataBase.getById('users', id);
    return user;
  }

  async update(id: string, user: User) {
    const updatedUser = await dataBase.update('users', id, user);
    return updatedUser;
  }

  async delete(id: string) {
    const isDeleted = await dataBase.delete('users', id);
    return isDeleted;
  }
}

export default new UserService();
