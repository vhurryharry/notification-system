import express from "express";
import channelsService from "../services/channels.service";

class ChannelsMiddleware {
  async validateRequiredChannelBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.name) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required fields - name`,
      });
    }
  }

  async validateChannelExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const channel = await channelsService.readById(
      parseInt(req.params.channelId)
    );
    if (channel) {
      next();
    } else {
      res.status(404).send({
        error: `Channel ${req.params.channelId} not found`,
      });
    }
  }

  async extractChannelId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body = {
      ...req.body,
      id: parseInt(req.params.channelId),
    };

    next();
  }
}

export default new ChannelsMiddleware();
