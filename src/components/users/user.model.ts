import EntityBase from '../../shared/models/entity-base';

type UserModelType = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

class UserModel extends EntityBase {
  username;
  age;
  hobbies;

  constructor({ id, username, age, hobbies }: UserModelType) {
    super({ id });
    this.id = id;
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }
}

export default UserModel;
