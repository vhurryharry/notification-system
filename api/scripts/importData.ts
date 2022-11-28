import { Category, Channel, PrismaClient, User } from "@prisma/client";
import {
  getUsers,
  categories as seedCategories,
  channels as seedChannels,
} from "./getSeedData";

const prisma = new PrismaClient();

const main = async () => {
  const categories: Array<Category> = [];
  for (let category of seedCategories) {
    categories.push(
      await prisma.category.create({
        data: category,
      })
    );
  }

  const channels: Array<Channel> = [];
  for (let channel of seedChannels) {
    channels.push(
      await prisma.channel.create({
        data: channel,
      })
    );
  }

  const seedUsers = await getUsers();
  const users: Array<User> = [];
  for (let user of seedUsers) {
    users.push(
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: user.password,
        },
      })
    );
  }

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const seedUser = seedUsers[i];

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        subscribed: {
          create: seedUser.subscribed.map((index) => ({
            categoryId: categories[index].id,
          })),
        },
        channels: {
          create: seedUser.channels.map((index) => ({
            channelId: channels[index].id,
          })),
        },
      },
    });
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
