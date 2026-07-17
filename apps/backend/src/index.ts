import express from "express";
import type { Request, Response } from "express"

const app = express();
app.disable("x-powered-by");

const port = 3000;


app.get('/', (req: Request, res: Response) => {
  res.json("server running...");
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
