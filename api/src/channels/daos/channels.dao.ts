import { PrismaClient, Channel } from "@prisma/client";
import { getPrisma } from "@app/database";

import { GetChannelDto } from "../dtos/get.channel.dto";
import { PutChannelDto } from "../dtos/put.channel.dto";
import { CreateChannelDto } from "../dtos/create.channel.dto";

class ChannelsDao {
  prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }

  async addChannel(channel: CreateChannelDto): Promise<Channel> {
    const result = await this.prisma.channel.create({
      data: {
        name: channel.name,
      },
    });

    return result;
  }

  async getChannels(): Promise<Array<GetChannelDto>> {
    const result = await this.prisma.channel.findMany({});

    return result;
  }

  async getChannel(id: number): Promise<GetChannelDto | null> {
    const result = await this.prisma.channel.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async removeChannel(id: number): Promise<Channel> {
    const result = await this.prisma.channel.delete({
      where: {
        id,
      },
    });

    return result;
  }

  async updateChannel(id: number, channel: PutChannelDto): Promise<Channel> {
    const result = await this.prisma.channel.update({
      where: {
        id,
      },
      data: {
        name: channel.name,
      },
    });

    return result;
  }
}

export default new ChannelsDao();
