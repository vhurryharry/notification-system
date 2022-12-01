export const exclude = (user: any, keys: string[]) => {
  for (let key of keys) {
    delete user[key];
  }
  return user;
};
