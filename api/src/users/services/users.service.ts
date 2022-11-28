import { User } from "@prisma/client";

import usersDao from "@app/users/daos/users.dao";
import { CRUD } from "@app/common/interfaces/crud.interface";
import { CreateUserDto } from "@app/users/dtos/create.user.dto";
import { PutUserDto } from "@app/users/dtos/put.user.dto";

class UsersService implements CRUD {
  async create(resource: CreateUserDto): Promise<User> {
    return usersDao.addUser(resource);
  }

  async deleteById(id: number): Promise<User> {
    return usersDao.removeUser(id);
  }

  async list(limit: number, page: number): Promise<Array<User>> {
    return usersDao.getUsers(limit, page);
  }

  async putById(id: number, resource: PutUserDto): Promise<any> {
    return usersDao.updateUser(id, resource);
  }

  async readById(id: number): Promise<User | null> {
    return usersDao.getUser(id);
  }
}

export default new UsersService();
