import { Request, Response } from "express";
import { CommentService } from "../comment/comment.service";
import { prisma } from "../../lib/prisma/client";

const commentService = new CommentService();

export class CommentController {
  async create(req: Request, res: Response): Promise<void> {
    const { cardId, authorId, content } = req.body;

    if (!cardId || !content) {
      res.status(400).json({ message: "cardId e content são obrigatórios" });
      return;
    }

    if (!authorId) {
      res.status(400).json({ message: "authorId é obrigatório" });
      return;
    }
    const comment = await commentService.createComment(
      cardId,
      authorId,
      content
    );
    res.status(201).json(comment);
  }

  async list(req: Request, res: Response): Promise<void> {
    const { cardId } = req.query;

    if (!cardId || typeof cardId !== "string") {
      res.status(400).json({ message: "cardId é obrigatório" });
      return;
    }

    const cardExists = await prisma.card.findUnique({ where: { id: cardId } });
    if (!cardExists) {
      res.status(404).json({ message: "Cartão não encontrado" });
      return;
    }

    const comments = await commentService.getComments(cardId);
    res.json(comments);
  }
}
