import redis from "redis";

const redisClient = redis.createClient({
  // host: "redis-15191.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  // port: 15191,
  // url: "redis://redis-15191.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:15191",
  socket: {
    host: "redis-15191.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
    port: 15191,
  },
  password: "cBrJLHGdGDXlf1y8gzRC7GiAC1Y63Crw",
});

await redisClient.connect();

redisClient.on("connect", () => {
  console.log("redis on");
});
redisClient.on("error", (err) => {
  console.log(err);
});

export default redisClient;
