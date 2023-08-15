import express from "express";
import { router as loginRouter } from "./routers/login.route";
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


app.use( loginRouter);

