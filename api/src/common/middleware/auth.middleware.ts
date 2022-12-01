import express from "express";
import createHttpError from "http-errors";
import { verifyAccessToken } from "../../utils/auth";

class AuthMiddleware {
  async auth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!req.headers.authorization) {
      return next(createHttpError.Unauthorized("Access token is required"));
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(createHttpError.Unauthorized());
    }
    await verifyAccessToken(token)
      .then((user) => {
        (req as any).user = user;
        next();
      })
      .catch((e) => {
        next(createHttpError.Unauthorized(e.message));
      });
  }
}

export default new AuthMiddleware();
