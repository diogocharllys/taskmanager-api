import { Router } from "express";
import { CardController } from "../card/card.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { createCardSchema, updateCardSchema } from "./card.schema";

const router = Router();
const cardController = new CardController();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: Rotas de gerenciamento de cards
 */

/**
 * @swagger
 * /cards:
 *   post:
 *     summary: Criar um novo card
 *     tags: [Cards]
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
 *               description:
 *                 type: string
 *               listId:
 *                 type: string
 *               assignedToId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Card criado com sucesso
 */
router.post("/", validateBody(createCardSchema), cardController.create);

/**
 * @swagger
 * /cards:
 *   get:
 *     summary: Listar todos os cards
 *     tags: [Cards]
 *     responses:
 *       200:
 *         description: Lista de cards
 */
router.get("/", cardController.list);

/**
 * @swagger
 * /cards/{id}:
 *   put:
 *     summary: Atualizar um card existente
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do card a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               listId:
 *                 type: string
 *               assignedToId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Card atualizado com sucesso
 */
router.put("/:id", validateBody(updateCardSchema), cardController.update);

/**
 * @swagger
 * /cards/{id}:
 *   delete:
 *     summary: Deletar um card existente
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do card a ser deletado
 *     responses:
 *       204:
 *         description: Card deletado com sucesso
 */
router.delete("/:id", cardController.delete);

export { router as cardRoutes };
