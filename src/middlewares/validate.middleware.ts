import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((err) => err.message);
      // TODO: throw validation error instead
      res.status(400).json({ status: "error", message: errors });
      return;
    }

    req.body = result.data;
    next();
  };
};
