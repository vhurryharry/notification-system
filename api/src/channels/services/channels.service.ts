import { Channel } from "@prisma/client";

import { CRUD } from "@app/common/interfaces/crud.interface";

import { GetChannelDto } from "../dtos/get.channel.dto";
import { PutChannelDto } from "../dtos/put.channel.dto";
import { CreateChannelDto } from "../dtos/create.channel.dto";
import channelsDao from "../daos/channels.dao";

class ChannelsService implements Omit<CRUD, "list"> {
  async create(resource: CreateChannelDto): Promise<Channel> {
    return channelsDao.addChannel(resource);
  }

  async deleteById(id: number): Promise<Channel> {
    return channelsDao.removeChannel(id);
  }

  async list(): Promise<Array<GetChannelDto>> {
    return channelsDao.getChannels();
  }

  async readById(id: number): Promise<GetChannelDto | null> {
    return channelsDao.getChannel(id);
  }

  async putById(id: number, resource: PutChannelDto): Promise<Channel> {
    return channelsDao.updateChannel(id, resource);
  }
}

export default new ChannelsService();
