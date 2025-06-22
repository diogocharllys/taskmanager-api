import { prisma } from "../../lib/prisma/client";
import { Board } from "@prisma/client";

export class BoardService {
  async createBoard(name: string, projectId: string): Promise<Board> {
    return await prisma.board.create({
      data: {
        name,
        projectId,
      },
    });
  }

  async getBoardsByProject(projectId: string): Promise<Board[]> {
    return await prisma.board.findMany({
      where: { projectId },
    });
  }

  async updateBoard(boardId: string, name: string): Promise<Board> {
    return await prisma.board.update({
      where: { id: boardId },
      data: { name },
    });
  }

  async deleteBoard(boardId: string): Promise<void> {
    await prisma.board.delete({
      where: { id: boardId },
    });
    return;
  }
}
