import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { teamRoutes } from "../modules/team/team.routes";
import { projectRoutes } from "../modules/project/project.routes";
import { boardRoutes } from "../modules/board/board.routes";
import { listRoutes } from "../modules/list/list.routes";
import { cardRoutes } from "../modules/card/card.routes";
import { commentRoutes } from "../modules/comment/comment.routes";
import { historyRoutes } from "../modules/history/history.routes";

const router = Router();

// Rotas principais
router.use("/auth", authRoutes);
router.use("/teams", teamRoutes);
router.use("/projects", projectRoutes);

// Rotas aninhadas
router.use("/projects/:projectId/boards", boardRoutes);
router.use("/projects/:projectId/boards/:boardId/lists", listRoutes);
router.use("/projects/:projectId/boards/:boardId/lists/:listId/cards", cardRoutes);
router.use("/projects/:projectId/boards/:boardId/lists/:listId/cards/:cardId/comments", commentRoutes);
router.use("/projects/:projectId/boards/:boardId/lists/:listId/cards/:cardId/histories", historyRoutes);

export { router };
