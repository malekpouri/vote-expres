import express from "express";
import { router as loginRouter } from "./routers/login.route";
import { router as planhadler } from "./routers/plan.route";
import { z } from "zod";
export const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "TEST") {
  app.use((req, res, next) => {
    console.log("Request received");
    console.log("Method: ", req.method);
    console.log("Url: ", req.url);
    next();
  });
}

app.use(loginRouter);
app.use(planhadler);

app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof z.ZodError) {
    res.status(400).send({ message: err.issues[0].message });
    return;
  }
  // console.log(err);
  res.status(500).send({ message: "internal server error" });
});
