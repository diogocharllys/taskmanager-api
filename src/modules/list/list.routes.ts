import { Router } from "express";
import { ListController } from "../list/list.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { createListSchema, updateListSchema } from "./list.schema";

const router = Router();
const listController = new ListController();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Lists
 *   description: Rotas de gerenciamento de listas
 */

/**
 * @swagger
 * /lists:
 *   post:
 *     summary: Criar uma nova lista
 *     tags: [Lists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               boardId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lista criada
 */
router.post("/", validateBody(createListSchema), listController.create);

/**
 * @swagger
 * /lists:
 *   get:
 *     summary: Listar todas as listas
 *     tags: [Lists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de listas
 */
router.get("/", listController.list);

/**
 * @swagger
 * /lists/{id}:
 *   put:
 *     summary: Atualizar uma lista
 *     tags: [Lists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da lista a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lista atualizada
 */
router.put("/:id", validateBody(updateListSchema), listController.update);

/**
 * @swagger
 * /lists/{id}:
 *   delete:
 *     summary: Deletar uma lista
 *     tags: [Lists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da lista a ser deletada
 *     responses:
 *       204:
 *         description: Lista deletada com sucesso
 */
router.delete("/:id", listController.delete);

export { router as listRoutes };
