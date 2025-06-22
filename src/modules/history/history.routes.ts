import { Router } from 'express';
import { HistoryController } from '../../modules/history/history.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
const historyController = new HistoryController();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Histories
 *   description: Rotas de gerenciamento de histórico de cartões
 */

/**
 * @swagger
 * /histories/{cardId}:
 *   get:
 *     summary: Listar histórico de cards
 *     tags: [Histories]
 *     responses:
 *       200:
 *         description: Lista de histórico de cards
 */

router.get("/", historyController.getCardHistories);

export { router as historyRoutes };
