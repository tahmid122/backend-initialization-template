import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
const app = express();

//default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: config.APP_URL, credentials: true }));

//routes

//default get
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    success: true,
    message: "Server is running...",
  });
});

//404
app.use((req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: "Requested route not found",
    path: req.path,
  });
});

app.use(globalErrorHandler);
export default app;
