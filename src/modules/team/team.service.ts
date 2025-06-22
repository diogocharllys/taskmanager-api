import { prisma } from "../../lib/prisma/client";
import { Team } from "@prisma/client";

export class TeamService {
  async createTeam(name: string, userId: string): Promise<Team> {
    const team = await prisma.team.create({
      data: {
        name,
        users: {
          create: {
            userId,
            role: "admin",
          },
        },
      },
    });
    return team;
  }

  async getUserTeams(userId: string): Promise<Team[]> {
    const teams = await prisma.team.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
      include: {
        users: true,
      },
    });
    return teams;
  }
}
