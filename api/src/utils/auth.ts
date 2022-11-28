import bcrypt from "bcrypt";

const saltRounds = 10;

export const encryptPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

export const verifyPassword = (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
