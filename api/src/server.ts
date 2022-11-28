import express from "express";
import { Server } from "http";

import { getPrisma } from "./database";
import { CommonRoutesConfig } from "@app/common/common.routes.config";
import { NotificationsRoutes } from "@app/notifications/notifications.routes.config";
import { UsersRoutes } from "@app/users/users.routes.config";

export const start = async (): Promise<Server> =>
  new Promise(async (resolve, reject) => {
    try {
      const port = 4040;
      const app = express();
      const routes: Array<CommonRoutesConfig> = [];

      getPrisma();

      routes.push(new NotificationsRoutes(app));
      routes.push(new UsersRoutes(app));

      app.get("/", (req, res) => {
        res.send("Hello World!");
      });

      const server = app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
        resolve(server);
      });
    } catch (err) {
      reject(err);
    }
  });
