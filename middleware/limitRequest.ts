const NodeCache = require('node-cache');


const cache = new NodeCache({ stdTTL: 60, checkperiod: 5 });

let db;

const limitRequests:any = async (req, res, next:any) => {
    const ip = req.ip;
    const count = cache.get(ip) || 0;
  
    if (count >= 5) {
      res.status(429).send('Too many requests');
    } else {
      cache.set(ip, count + 1);
      next();
    }
  };

  module.exports={
    limitRequests
  }