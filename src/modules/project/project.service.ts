import { prisma } from "../../lib/prisma/client";
import { Project } from "@prisma/client";

export class ProjectService {
  async createProject(name: string, teamId: string): Promise<Project> {
    const project = await prisma.project.create({
      data: {
        name,
        teamId,
      },
    });

    return project;
  }

  async getProjectsByTeam(teamId: string): Promise<Project[]> {
    const projects = await prisma.project.findMany({
      where: {
        teamId,
      },
    });

    return projects;
  }
}
