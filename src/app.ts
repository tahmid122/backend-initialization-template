import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
const app = express();

//default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: config.APP_URL, credentials: true }));

//default get
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    success: true,
    message: "Server is running...",
  });
});
app.use(globalErrorHandler);
export default app;
