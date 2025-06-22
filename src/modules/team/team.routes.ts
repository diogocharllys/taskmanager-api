import { Router } from "express";
import { TeamController } from "../team/team.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { createTeamSchema } from "./team.schema";

const router = Router();
const teamController = new TeamController();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Rotas de gerenciamento de times
 */

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Criar um novo time
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Time criado
 */
router.post("/", validateBody(createTeamSchema),teamController.create);

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Listar todos os times
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de times
 */
router.get("/", teamController.list);

export { router as teamRoutes };
