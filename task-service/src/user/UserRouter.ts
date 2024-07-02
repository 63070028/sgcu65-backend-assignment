import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "./models/User";
import { UserServiceImpl } from "./service/UserServiceImpl";
import { CreateUserRequest } from "./models/CreateUserRequest";
import { UpdateUserRequest } from "./models/UpdateUserRequest";
import { RemoveUserRequest } from "./models/RemoveUserRequest";

const router = Router();

const repository = AppDataSource.getRepository(User);

const service = new UserServiceImpl(repository);


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   surname:
 *                     type: string
 *                   role:
 *                     type: string
 */
router.get("/", async (req:Request, res:Response<User[]>) => {
    await service.findAll().then(users => {
        res.send(users);
    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
    })
})

/**
 * @swagger
 * /users/findById/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   surname:
 *                     type: string
 *                   role:
 *                     type: string
 *       404:
 *         description: user not found
 */                
router.get("/findById/:id", async (req:Request, res:Response<User>) => {
    const id = Number(req.params.id);
    await service.findById(id).then(user => {
        res.send(user);
    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
    })
})


/**
 * @swagger
 * /users/findByFirstName/{firstname}:
 *  get:
 *    parameters:
 *       - in: path
 *         name: firstname
 *         required: true
 *         schema:
 *           type: string
 *    responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   surname:
 *                     type: string
 *                   role:
 *                     type: string
 */
router.get("/findByFirstName/:firstname", async (req:Request, res:Response<User[]>) => {
    const firstname = String(req.params.firstname);
    await service.findByFirstName(firstname).then(users => {
        res.send(users);
    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
    })
})

/**
 * @swagger
 * /users/findBySurName/{surname}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: surname
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   surname:
 *                     type: string
 *                   role:
 *                     type: string
 */
router.get("/findBySurName/:surname", async (req:Request, res:Response<User[]>) => {
    const surname = String(req.params.surname);
    await service.findBySurName(surname).then(users => {
        res.send(users);
    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
    })
})

/**
 * @swagger
 * /users/findByRole/{role}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   surname:
 *                     type: string
 *                   role:
 *                     type: string
 */
router.get("/findByRole/:role", async (req:Request, res:Response<User[]>) => {
    const role = String(req.params.role);
    await service.findByRole(role).then(users => {
        res.send(users);
    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
    })
})

/**
 * @swagger
 * /users:
 *   post:
 *     summary: create user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstname:
 *                 type: string
 *               surname:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   surname:
 *                     type: string
 *                   role:
 *                     type: string
 */
router.post("/", async(req:Request<CreateUserRequest>, res:Response<User>) => {
    await service.create(req.body).then(task => {
        res.send(task);
    }).catch(error => {
        console.log(error);
        res.status(500).send(error);
    })
})

/**
 * @swagger
 * /users:
 *   put:
 *     summary: update user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               email:
 *                 type: string
 *               firstname:
 *                 type: string
 *               surname:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   surname:
 *                     type: string
 *                   role:
 *                     type: string
 *       404:
 *         description: user not found
 */     
router.put("/", async(request:Request<UpdateUserRequest>, res:Response<User>) => {
    await service.update(request.body).then(task => {
        res.send(task);
    }).catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: remove user
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
 *         description: A single task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   surname:
 *                     type: string
 *                   role:
 *                     type: string
 *       404:
 *         description: user not found
 */     
router.delete("/", async(request:Request<RemoveUserRequest>, res:Response<User>) => {
    await service.remove(request.body).then(task => {
        res.send(task);
    }).catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})




export default router;