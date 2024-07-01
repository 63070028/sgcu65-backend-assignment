import express, { Request, Response } from "express";
import dotnev from "dotenv";
import { AppDataSource } from "./data-source";
import { setupSwagger } from "./swagger";
import { Task } from "./entity/Task";
import { taskServiceImpl } from "./service/taskServiceImpl";
import { createTaskRequest } from "./model/request/createTaskRequest";
import { updateTaskRequest } from "./model/request/updateTaskRequest";
import { removeTaskRequest } from "./model/request/removeTaskRequest";

dotnev.config();

const app = express();
const port = process.env.PORT;
const repository = AppDataSource.getRepository(Task);
const service = new taskServiceImpl(repository);
app.use(express.json());

setupSwagger(app);


/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve a list of tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   content:
 *                     type: string
 *                   status:
 *                     type: string
 *                   deadline:
 *                     type: string
 */
app.get("/tasks", async (req:Request, res:Response<Task[]>)=>{
    await service.findAll().then(tasks => {
        res.send(tasks);
    }).catch(err => {
        console.log(err);
    })
})


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *               deadline:
 *                 type: string
 *               users:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     firstname:
 *                       type: string
 *                     surname:
 *                       type: string
 *                     role:
 *                       type: string
 *     responses:
 *       200:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 content:
 *                   type: string
 *                 status:
 *                   type: string
 *                 deadline:
 *                   type: string
 */
app.post("/tasks", async (req:Request<createTaskRequest>, res:Response<Task>) => {
    await service.create(req.body).then(task => {
        res.send(task);
    }).catch(err => {
        console.log(err);
    })
})

/**
 * @swagger
 * /tasks:
 *   put:
 *     summary: Update task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *               deadline:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 content:
 *                   type: string
 *                 status:
 *                   type: string
 *                 deadline:
 *                   type: string
 */
app.put("/tasks", async(request:Request<updateTaskRequest>, res:Response<Task>) => {
    await service.update(request.body).then(task => {
        res.send(task);
    }).catch(err => {
        console.log(err);
    })
})

/**
 * @swagger
 * /tasks:
 *   delete:
 *     summary: delete task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 content:
 *                   type: string
 *                 status:
 *                   type: string
 *                 deadline:
 *                   type: string
 */
app.delete("/tasks", async(request:Request<removeTaskRequest>, res:Response<Task>) => {
    await service.remove(request.body).then(task => {
        res.send(task);
    }).catch(err => {
        console.log(err);
    })
})

/**
 * @swagger
 * /tasks/id/{id}:
 *   get:
 *     summary: Retrieve a single task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       200:
 *         description: A single task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The task ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The task name
 *                   example: Do the dishes
 *                 content:
 *                   type: string
 *                   description: The task content
 *                   example: Wash all the dishes in the sink
 *                 status:
 *                   type: string
 *                   description: The task status
 *                   example: In Progress
 *                 deadline:
 *                   type: string
 *                   format: date-time
 *                   description: The task deadline
 *                   example: 2024-12-31T23:59:59Z
 *       404:
 *         description: Task not found
 */
app.get("/tasks/id/:id", async(request:Request, res:Response<Task>) => {
    const id = Number(request.params.id);
    await service.findById(id).then(task => {
        res.send(task);
    }).catch(err => {
        console.log(err);
    })
})


/**
 * @swagger
 * /tasks/name/{name}:
 *   get:
 *     summary: Retrieve a single task by Name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The task name
 *     responses:
 *       200:
 *         description: A single task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The task ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The task name
 *                   example: Do the dishes
 *                 content:
 *                   type: string
 *                   description: The task content
 *                   example: Wash all the dishes in the sink
 *                 status:
 *                   type: string
 *                   description: The task status
 *                   example: In Progress
 *                 deadline:
 *                   type: string
 *                   format: date-time
 *                   description: The task deadline
 *                   example: 2024-12-31T23:59:59Z
 *       404:
 *         description: Task not found
 */
app.get("/tasks/name/:name", async(request:Request, res:Response<Task>) => {
    const name = String(request.params.name);
    await service.findByName(name).then(task => {
        res.send(task);
    }).catch(err => {
        console.log(err);
    })
})



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