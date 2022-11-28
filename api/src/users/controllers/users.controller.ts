import express from "express";
import usersService from "@app/users/services/users.service";

class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    const users = await usersService.list(req.body.limit, req.body.page);
    res.status(200).send(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await usersService.readById(req.body.id);
    res.status(200).send(user);
  }

  async createUser(req: express.Request, res: express.Response) {
    const userId = await usersService.create(req.body);
    res.status(201).send({ id: userId });
  }

  async put(req: express.Request, res: express.Response) {
    await usersService.putById(req.body.id, req.body);
    res.status(204).send();
  }

  async removeUser(req: express.Request, res: express.Response) {
    await usersService.deleteById(req.body.id);
    res.status(204).send();
  }
}

export default new UsersController();
