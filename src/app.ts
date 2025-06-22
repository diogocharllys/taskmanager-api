import express from "express";
import { Request, Response, NextFunction } from "express";
import { router } from "./routes/routes.index";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.config";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());

app.get("/", (_, res: Response): void => {
  res.send("Task Manager API is running");
});

app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
