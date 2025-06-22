import { prisma } from "../../lib/prisma/client";
import { Card } from "@prisma/client";
import { HistoryService } from "../history/history.service";

export class CardService {
  private historyService = new HistoryService();

  async createCard(data: {
    title: string;
    description?: string;
    listId: string;
    assignedToId?: string;
  }): Promise<Card> {
    const card = await prisma.card.create({ data });

    await this.historyService.createHistory({
      cardId: card.id,
      action: `Card criado com título "${card.title}"`,
    });

    return card;
  }

  async getCardsByList(listId: string): Promise<Card[]> {
    return await prisma.card.findMany({
      where: { listId },
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async updateCard(
    id: string,
    data: { title?: string; description?: string; assignedToId?: string }
  ): Promise<Card> {
    const existingCard = await prisma.card.findUnique({ where: { id } });
    if (!existingCard) throw new Error("Card não encontrado");

    const updates: string[] = [];

    if (data.title && data.title !== existingCard.title)
      updates.push(
        `Título alterado de "${existingCard.title}" para "${data.title}"`
      );

    if (data.description && data.description !== existingCard.description)
      updates.push("Descrição atualizada");

    if (data.assignedToId && data.assignedToId !== existingCard.assignedToId)
      updates.push("Responsável atualizado");

    const updatedCard = await prisma.card.update({
      where: { id },
      data,
    });

    await Promise.all(
      updates.map((action) =>
        this.historyService.createHistory({
          cardId: id,
          action,
        })
      )
    );

    return updatedCard;
  }

  async deleteCard(id: string): Promise<void> {
    await prisma.comment.deleteMany({
      where: {
        cardId: id,
      },
    });
    
    await prisma.history.deleteMany({
      where: {
        cardId: id,
      },
    });

    await prisma.card.delete({
      where: { id },
    });
  }
}
