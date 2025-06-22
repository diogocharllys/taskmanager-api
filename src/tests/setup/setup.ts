import 'dotenv/config';
import { prisma } from "../../lib/prisma/client";

beforeAll(async () => {
  await prisma.$transaction([
    prisma.comment.deleteMany(),
    prisma.history.deleteMany(),
    prisma.card.deleteMany(),
    prisma.list.deleteMany(),
    prisma.board.deleteMany(),
    prisma.project.deleteMany(),
    prisma.teamUser.deleteMany(),
    prisma.team.deleteMany(),
    prisma.user.deleteMany(),
  ]);
});
