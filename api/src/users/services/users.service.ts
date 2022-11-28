import usersDao from "@app/users/daos/users.dao";
import { GetUserDto } from "@app/users/dtos/get.user.dto";

class UsersService {
  async login(email: string, password: string): Promise<GetUserDto> {
    return usersDao.login(email, password);
  }

  async readById(id: number): Promise<GetUserDto | null> {
    return usersDao.getUser(id);
  }
}

export default new UsersService();
