import express, { Request } from "express";
import { getDailyWeatherForecast, getWeatherNow } from "../api";

export const router = express.Router();

router.use("/weather", async (req: Request, res) => {
  res.send(
    await getDailyWeatherForecast(req.query.days as any, req.query.id as any)
  );
});

router.use("/now", async (req: Request, res) => {
  res.send(await getWeatherNow(req.query.id as any));
});

export default router;
