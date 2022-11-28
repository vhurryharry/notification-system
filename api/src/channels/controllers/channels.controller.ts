import express from "express";
import channelsService from "../services/channels.service";

class ChannelsController {
  async listChannels(req: express.Request, res: express.Response) {
    const channels = await channelsService.list();
    res.status(200).send(channels);
  }

  async getChannelById(req: express.Request, res: express.Response) {
    const channel = await channelsService.readById(req.body.id);
    res.status(200).send(channel);
  }

  async createChannel(req: express.Request, res: express.Response) {
    const channel = await channelsService.create(req.body);
    res.status(201).send({ channel });
  }

  async put(req: express.Request, res: express.Response) {
    await channelsService.putById(req.body.id, req.body);
    res.status(204).send();
  }

  async removeChannel(req: express.Request, res: express.Response) {
    await channelsService.deleteById(req.body.id);
    res.status(204).send();
  }
}

export default new ChannelsController();
