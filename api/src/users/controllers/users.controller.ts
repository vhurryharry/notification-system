import express from "express";
import usersService from "@app/users/services/users.service";

class UsersController {
  async login(req: express.Request, res: express.Response) {
    const user = await usersService.login(req.body.email, req.body.password);
    res.status(200).send(user);
  }
}

export default new UsersController();
