import { prisma } from "../../lib/prisma/client";
import { List } from "@prisma/client";

export class ListService {
  async createList(title: string, boardId: string): Promise<List> {
    return await prisma.list.create({
      data: {
        title,
        boardId,
      },
    });
  }

  async getListsByBoard(boardId: string): Promise<List[]> {
    return await prisma.list.findMany({
      where: { boardId },
    });
  }

  async updateList(listId: string, title: string): Promise<List> {
    return await prisma.list.update({
      where: { id: listId },
      data: { title },
    });
  }

  async deleteList(listId: string): Promise<List> {
    return await prisma.list.delete({
      where: { id: listId },
    });
  }
}
