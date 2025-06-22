import { prisma } from "../../lib/prisma/client";
import { History } from "@prisma/client";

export class HistoryService {
  async createHistory(data: {
    cardId: string;
    action: string;
  }): Promise<History> {
    return await prisma.history.create({
      data: {
        cardId: data.cardId,
        action: data.action,
      },
    });
  }

  async getHistoryByCard(cardId: string): Promise<History[]> {
    return await prisma.history.findMany({
      where: { cardId },
      orderBy: { timestamp: "desc" },
    });
  }
}
