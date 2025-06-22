import { Request, Response } from "express";
import { prisma } from "../../lib/prisma/client";

export class HistoryController {
  async getCardHistories(req: Request, res: Response): Promise<void> {
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
    const histories = await prisma.history.findMany({
      where: { cardId: cardId as string },
      orderBy: { timestamp: "desc" },
    });

    res.json(histories);
    return;
  }
}
