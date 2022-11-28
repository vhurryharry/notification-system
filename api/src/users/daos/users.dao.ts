import { PrismaClient, User } from "@prisma/client";
import { getPrisma } from "@app/database";
import createHttpError from "http-errors";

import { GetUserDto } from "@app/users/dtos/get.user.dto";
import { createAccessToken, verifyPassword } from "@app/utils/auth";

class UsersDao {
  prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }

  async login(email: string, password: string): Promise<GetUserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw createHttpError.NotFound("User not registered");
    }

    const checkPassword = verifyPassword(password, user.password);

    if (!checkPassword) {
      throw createHttpError.Unauthorized("Email address or password not valid");
    }

    const { ["password"]: _, ...userDto } = user;
    const accessToken = await createAccessToken(userDto);

    return {
      ...userDto,
      accessToken,
    };
  }

  async getUser(id: number): Promise<GetUserDto | null> {
    const result = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        channels: true,
        subscribed: true,
      },
    });

    return result;
  }

  async getUsers(channel: number, category: number): Promise<Array<User>> {
    const users = await this.prisma.user.findMany({
      where: {
        subscribed: {
          some: {
            id: category,
          },
        },
        channels: {
          some: {
            id: channel,
          },
        },
      },
    });

    return users;
  }
}

export default new UsersDao();
