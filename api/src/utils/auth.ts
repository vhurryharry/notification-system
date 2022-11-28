import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { sign, verify } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const saltRounds = 10;
const accessTokenSecret = process.env.JWT_TOKEN || "JWT_TOKEN";

export const encryptPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

export const verifyPassword = (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const createAccessToken = (payload: Object): Promise<string> => {
  return new Promise((resolve, reject) => {
    sign({ payload }, accessTokenSecret, {}, (err, token) => {
      if (err) {
        reject(createHttpError.InternalServerError());
      }

      resolve(token!);
    });
  });
};

export const verifyAccessToken = (token: string) => {
  return new Promise((resolve, reject) => {
    verify(token, accessTokenSecret, (err, payload) => {
      if (err) {
        const message =
          err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
        return reject(createHttpError.Unauthorized(message));
      }

      resolve(payload);
    });
  });
};
