import { Router } from "express";
import { ProjectController } from "../project/project.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { createProjectSchema } from "../project/project.schema";


const router = Router();
const projectController = new ProjectController();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Rotas de gerenciamento de projetos
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Criar um novo projeto
 *     tags: [Projects]
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
 *               teamId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Projeto criado
 */
router.post("/", validateBody(createProjectSchema), projectController.create);

/**
 * @swagger
 * /projects/{teamId}:
 *   get:
 *     summary: Listar todos os projetos
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de projetos
 */
router.get("/:teamId", projectController.list);

export { router as projectRoutes };
