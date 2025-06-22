import { Request, Response } from "express";
import { CardService } from "../card/card.service";

const cardService = new CardService();

export class CardController {
  async create(req: Request, res: Response): Promise<void> {
    const { title, description, listId, assignedToId } = req.body;

    if (!title || !listId) {
      res.status(400).json({ message: "title e listId são obrigatórios" });
      return;
    }

    const card = await cardService.createCard({
      title,
      description,
      listId,
      assignedToId,
    });
    res.status(201).json(card);
    return;
  }

  async list(req: Request, res: Response): Promise<void> {
    const { listId } = req.query;

    if (!listId || typeof listId !== "string") {
      res.status(400).json({ message: "listId é obrigatório" });
      return;
    }

    const cards = await cardService.getCardsByList(listId);
    res.json(cards);
    return;
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, description, assignedToId } = req.body;

    const card = await cardService.updateCard(id, {
      title,
      description,
      assignedToId,
    });
    if (!card) {
      res.status(404).json({ message: "Card não encontrado" });
      return;
    }
    res.json(card);
    return;
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await cardService.deleteCard(id);
    res.status(204).send();
    return;
  }
}
