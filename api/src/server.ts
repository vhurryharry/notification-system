import express from "express";
import { Server } from "http";
import cors from "cors";

import { getPrisma } from "./database";
import { CommonRoutesConfig } from "@app/common/common.routes.config";
import { NotificationsRoutes } from "@app/notifications/notifications.routes.config";
import { UsersRoutes } from "@app/users/users.routes.config";
import { ChannelsRoutes } from "@app/channels/categories.routes.config";
import { CategoriesRoutes } from "@app/categories/categories.routes.config";

export const start = async (): Promise<Server> =>
  new Promise(async (resolve, reject) => {
    try {
      const port = 4040;
      const app = express();
      const routes: Array<CommonRoutesConfig> = [];

      getPrisma();

      app.use(cors());
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));

      routes.push(new ChannelsRoutes(app));
      routes.push(new CategoriesRoutes(app));
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
