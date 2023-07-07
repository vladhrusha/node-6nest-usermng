import { UserService } from './user.service';
import { UserController } from './user.controller';

import {
  PostUserDto,
  DeleteUserDto,
  GetUsersDto,
  GetUserDto,
  UpdateUserDto,
} from './user.dto';
import { User } from './user.interface';

describe('UserService', () => {
  let userService: UserService;
  let userController: UserController;

  beforeEach(() => {
    userService = new UserService();
    userController = new UserController(userService);
  });
  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const getUsersDto: GetUsersDto = {
        page: 0,
        limit: 5,
      };
      let result: User[];

      jest.spyOn(userService, 'getUsers').mockImplementation(() => result);
      expect(await userController.getAllUsers(getUsersDto)).toEqual(result);
    });
  });
  describe('addUser', () => {
    it('should return an array of users', async () => {
      const postUserDto: PostUserDto = {
        nickname: 'vladhrusha41',
        password: 'ps1',
        lastname: 'hrusha1',
        firstname: 'vlad1',
      };
      let result: Promise<string>;

      jest.spyOn(userService, 'addUser').mockImplementation(() => result);
      expect(await userController.addUser(postUserDto)).toEqual(result);
    });
  });
});
