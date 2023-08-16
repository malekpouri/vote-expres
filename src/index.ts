import { app } from "./api";
import { User } from "./model/entity";

const PORT = process.env.port || 3000;

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

app.listen(PORT, () => {
    console.log("Server is running on port  : "+PORT);
});
