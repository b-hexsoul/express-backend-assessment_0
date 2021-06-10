const cache = require("memory-cache");

/* NOTE:
This current middleware uses an in memory cache and is not a good solution if we are scaling. 
My understanding is...
The cached content will be lost if the server goes down. 
My preferred option would be to use a distributed cache like Redis.
I plan to learn more about Redis in the future.
*/

const cacheIt = (duration) => {
  return (req, res, next) => {
    let { sortBy, tags } = req.query;

    // Don't store if no tags
    if (!tags) {
      return next();
    }
    // Don't store if sortBy param is invalid
    if (!["id", "reads", "likes", "popularity"].includes(sortBy)) {
      return next();
    }

    const key = "__express__" + req.url;
    let cachedBody = cache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
    } else {
      res.sendResponse = res.json;
      res.json = (body) => {
        cache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

module.exports = cacheIt;
