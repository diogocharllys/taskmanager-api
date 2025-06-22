import { Router } from "express";
import { BoardController } from "../board/board.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { createBoardSchema, updateBoardSchema } from "./board.schema";

const router = Router();
const boardController = new BoardController();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: Rotas de gerenciamento de quadros
 */

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Criar um novo board
 *     tags: [Boards]
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
 *               projectId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Board criado
 */
router.post("/", validateBody(createBoardSchema), boardController.create);

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: List all boards
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/", boardController.list);

/**
 * @swagger
 * /boards/{id}:
 *   put:
 *     summary: Atualizar quadro
 *     tags: [Boards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boardId: { type: string }
 *               name: { type: string }
 *     responses:
 *       201:
 *         description: Quadros listados com sucesso
 *       400:
 *         description: Dados de solicitação inválidos
 */
router.put("/:id", validateBody(updateBoardSchema), boardController.update);

/**
 * @swagger
 * /boards/{id}:
 *   delete:
 *     summary: Deletar quadro
 *     tags: [Boards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boardId: { type: string }
 *     responses:
 *       201:
 *         description: Quadro deletado com sucesso
 *       400:
 *         description: Dados de solicitação inválidos
 */
router.delete("/:id", boardController.delete);

export { router as boardRoutes };
