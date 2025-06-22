import { Router } from "express";
import { CommentController } from "../comment/comment.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { createCommentSchema } from "../comment/comment.schema";

const router = Router();
const commentController = new CommentController();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Rotas de gerenciamento de comentários
 */

/** 
 * @swagger
 * /comments:
 *   post:
 *     summary: Adicionar um comentário a um card
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               cardId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comentário criado
*/
router.post("/", validateBody(createCommentSchema), commentController.create);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Listar todos os comentários
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de comentários
 */
router.get("/", commentController.list);

export { router as commentRoutes };
