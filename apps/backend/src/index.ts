import express from "express";
import type { Request, Response } from "express"
import { WssRegistry } from "./ws/WssRegistry/WssRegistry";
import { logger } from "@packages/tools";

const app = express();
app.disable("x-powered-by");

const port = 3000;


app.get('/', (req: Request, res: Response) => {
  res.json("server running...");
});


const server = app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});

const wssRegistry = new WssRegistry({ server });
