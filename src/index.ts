import { app } from "./api";
import { User } from "./model/entity";
import { AppDataSource } from "./utility/data-source";
import { seedUser } from "./utility/seed-data";

const PORT = process.env.port || 3000;

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
AppDataSource.initialize()
  .then(() => seedUser())
  .then(async () => {
    await seedUser();
    app.listen(PORT, () => {
      console.log("Server is running on port  : " + PORT);
    });
  });
