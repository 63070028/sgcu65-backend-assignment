import express from "express";
import dotnev from "dotenv";
import { AppDataSource } from "./data-source";
import { setupSwagger } from "./swagger";
import taskRoute from "./routes/task";


dotnev.config();

const app = express();
const port = process.env.PORT;

setupSwagger(app);

app.use(express.json());
app.use("/tasks", taskRoute);


app.listen(port, async ()=>{
    AppDataSource.initialize()
        .then(() => {
            console.log('[orm]: orm task initialize');
        })
        .catch((error) => {
            console.error('Error during Data Source initialization:', error.message);
            console.error(error.stack);
        });

    console.log(`[server]: task-service is running at http://localhost:${port}`)
})