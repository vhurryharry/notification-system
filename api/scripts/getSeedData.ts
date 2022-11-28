import { encryptPassword } from "../src/utils/auth";

const users = [
  {
    name: "First User",
    email: "first@user.com",
    phoneNumber: "(111) 111-1111",
    subscribed: [0, 1, 2],
    channels: [0, 1, 2],
  },
  {
    name: "Second User",
    email: "second@user.com",
    phoneNumber: "(222) 222-2222",
    subscribed: [0, 1],
    channels: [0, 2],
  },
  {
    name: "Third User",
    email: "third@user.com",
    phoneNumber: "(333) 333-3333",
    subscribed: [2],
    channels: [1],
  },
];

export const categories = [
  {
    name: "Sports",
  },
  {
    name: "Finance",
  },
  {
    name: "Movies",
  },
];

export const channels = [
  {
    name: "SMS",
  },
  {
    name: "E-Mail",
  },
  {
    name: "Push Notification",
  },
];

export const getUsers = async () => {
  return await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await encryptPassword("test"),
    }))
  );
};
