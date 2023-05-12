import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60, checkperiod: 5 });

let db;

const limitRequests: any = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const ip = req.ip;
  const count = (cache.get(ip) as number) || 0;

  if (count >= 10) {
    res.status(429).send("Too many requests");
  } else {
    cache.set(ip, count + 1);
    next();
  }
};

module.exports = {
  limitRequests,
};
