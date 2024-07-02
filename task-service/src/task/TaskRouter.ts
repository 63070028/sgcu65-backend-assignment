import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Task } from './models/Task';
import { TaskServiceImpl } from './service/TaskServiceImpl';
import { CreateTaskRequest } from './models/CreateTaskRequest';
import { UpdateTaskRequest } from './models/UpdateTaskRequest';
import { RemoveTaskRequest } from './models/RemoveTaskRequest';

const router = Router();

const repository = AppDataSource.getRepository(Task);

const service = new TaskServiceImpl(repository);

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
 *                   userId:
 *                     type: integer
 *
 */
router.get("/", async (req:Request, res:Response<Task[]>)=>{
    await service.findAll().then(tasks => {
        res.send(tasks);
    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
    })
})


/**
 * @swagger
 * /tasks/findById/{id}:
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
 *                 name:
 *                   type: string
 *                 content:
 *                   type: string
 *                 status:
 *                   type: string
 *                 deadline:
 *                   type: string
 *                 userId:
 *                    type: integer
 *       404:
 *         description: Task not found
 */
router.get("/findById/:id", async(request:Request, res:Response<Task>) => {
    const id = Number(request.params.id);
    await service.findById(id).then(task => {
        res.send(task);
    }).catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})


/**
 * @swagger
 * /tasks/findByName/{name}:
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
 *                   userId:
 *                     type: integer
 */
router.get("/findByName/:name", async(request:Request, res:Response<Task[]>) => {
    const name = String(request.params.name);
    await service.findByName(name).then(tasks => {
        res.send(tasks);
    }).catch(error => {
        console.log(error);
        res.status(404).send(error);
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
 *               userId:
 *                 type: integer
 * 
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
 *                 userId:
 *                    type: integer
 */
router.post("/", async (req:Request<CreateTaskRequest>, res:Response<Task>) => {
    await service.create(req.body).then(task => {
        res.send(task);
    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
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
 *               userId:
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
 *                 userId:
 *                   type: integer
 */
router.put("/", async(request:Request<UpdateTaskRequest>, res:Response<Task>) => {
    await service.update(request.body).then(task => {
        res.send(task);
    }).catch(error => {
        console.log(error);
        res.status(404).send(error);
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
 *                 name:
 *                   type: string
 *                 content:
 *                   type: string
 *                 status:
 *                   type: string
 *                 deadline:
 *                   type: string
 *                 userId:
 *                   type: integer
 */
router.delete("/", async(request:Request<RemoveTaskRequest>, res:Response<Task>) => {
    await service.remove(request.body).then(task => {
        res.send(task);
    }).catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})

export default router;