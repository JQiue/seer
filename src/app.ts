import dotenv from "dotenv";

dotenv.config({
  debug: true,
});

import express, { NextFunction, Request, Response } from "express";
import { getDailyWeatherForecast, getLocationID } from "./api";
import Router from "./router/index";
import timing from "./timing/index";
// import authentication from "./middleware/authentication";
// import morgan from "./middleware/morgan";
// import { logger } from "./util/logger";
// import { sendAdminEmail } from "./util/email";

const port = process.env.SERVER_PORT;
const app = express();

app
  .disable("x-powered-by")
  // .use(morgan)
  .use(express.json({ limit: process.env.REQUEST_BODY_SIZI }))
  .use("/", Router)
  .use(async (req: Request, res: Response, next: NextFunction) => {
    const data = await getLocationID("曾都区");
    // getDailyWeatherForecast(3, "");
    res.send(data);
  })
  .use((req: Request, res: Response, next: NextFunction) =>
    res.send("404 not found")
  )
  .use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(500);
    // logger.error(err);
  })
  .listen(port, async () => {
    // logger.info(`应用处于 ${process.env.NODE_ENV} 模式`);
    // logger.info(`The server run at the http://localhost:${port}`);
    console.log(`The server run at the http://localhost:${port}`);
    // sendAdminEmail("Aurora 服务已启动");
  });

timing();
