import { PrismaClient, User } from "@prisma/client";
import { getPrisma } from "@app/database";

import { CreateUserDto } from "@app/users/dtos/create.user.dto";
import { PutUserDto } from "@app/users/dtos/put.user.dto";

class UsersDao {
  prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }

  async addUser(user: CreateUserDto): Promise<User> {
    const result = await this.prisma.user.create({
      data: {
        name: user.name,
      },
    });

    return result;
  }

  async getUsers(limit: number, page: number): Promise<User[]> {
    const result = await this.prisma.user.findMany({
      skip: limit * page,
      take: limit,
    });

    return result;
  }

  async getUser(id: number): Promise<User | null> {
    const result = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async updateUser(id: number, user: PutUserDto): Promise<User> {
    const result = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: user.name,
      },
    });

    return result;
  }

  async removeUser(id: number): Promise<User> {
    const result = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default new UsersDao();
