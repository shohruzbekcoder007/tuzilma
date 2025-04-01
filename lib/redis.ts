import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST, // Agar serverda ishlayotgan bo'lsa, Redis hostini kiriting
  port: 6379, // Redis porti (default: 6379)
  password: process.env.REDIS_PASSWORD || "", // Agar parol bo'lsa, uni .env faylda saqlash tavsiya etiladi
});

export default redis;
