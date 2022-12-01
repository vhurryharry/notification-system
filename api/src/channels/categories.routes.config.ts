import { CommonRoutesConfig } from "@app/common/common.routes.config";
import authMiddleware from "@app/common/middleware/auth.middleware";
import express from "express";
import channelsController from "./controllers/channels.controller";
import channelsMiddleware from "./middleware/channels.middleware";

export class ChannelsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "channelsRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/channels`)
      .all(authMiddleware.auth)
      .get(channelsController.listChannels)
      .post(
        channelsMiddleware.validateRequiredChannelBodyFields,
        channelsController.createChannel
      );

    this.app.param(`channelId`, channelsMiddleware.extractChannelId);
    this.app
      .route(`/channels/:channelId`)
      .all(authMiddleware.auth, channelsMiddleware.validateChannelExists)
      .get(channelsController.getChannelById)
      .delete(channelsController.removeChannel);

    return this.app;
  }
}
