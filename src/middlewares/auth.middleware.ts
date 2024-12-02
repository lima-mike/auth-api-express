import { Response, NextFunction, Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errors.util";
import { verifyAccessToken } from "../utils/jwt.util";

declare module "express" {
  interface Request {
    claims?: JwtPayload;
  }
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UnauthorizedError("Missing Authorization Bearer token");
  }
  if (!/^Bearer [-._A-Za-z0-9]+$/.test(authHeader)) {
    throw new UnauthorizedError("Invalid Authorization Bearer token");
  }

  const token = authHeader.replace(/^Bearer /, "");

  try {
    const payload = verifyAccessToken(token);
    if (typeof payload == "string") {
      throw new UnauthorizedError("Invalid JWT");
    }
    req.claims = payload;
  } catch (e) {
    throw new UnauthorizedError("Access token is invalid");
  }

  next();
};

export default authenticate;
