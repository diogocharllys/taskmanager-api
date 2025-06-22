import { prisma } from "../../lib/prisma/client";
import { Comment } from "@prisma/client";

export class CommentService {
  async createComment(
    cardId: string,
    authorId: string,
    content: string
  ): Promise<Comment> {
    return await prisma.comment.create({
      data: {
        cardId,
        authorId,
        content,
      },
    });
  }

  async getComments(cardId: string): Promise<Comment[]> {
    return await prisma.comment.findMany({
      where: { cardId },
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });
  }
}
