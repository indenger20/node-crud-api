import { v4 as uuidv4 } from 'uuid';
import EntityBase from '../../shared/models/entity-base';

export type UserDto = {
  username: string;
  age: number;
  hobbies: string[];
};

class User extends EntityBase {
  id;
  username;
  age;
  hobbies;

  constructor({ id = uuidv4(), username, age, hobbies }: UserDto & { id?: string }) {
    super({ id });
    this.id = id;
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }

  public static fromDto(dto: UserDto) {
    return new User(dto);
  }
}

export default User;
