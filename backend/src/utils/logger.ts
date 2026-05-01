import pino from "pino";

export const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  base: {
    env: process.env.NODE_ENV,
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
});
