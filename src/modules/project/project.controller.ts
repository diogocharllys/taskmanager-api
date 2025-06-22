import { Request, Response } from "express";
import { ProjectService } from "../project/project.service";

const projectService = new ProjectService();

export class ProjectController {
  async create(req: Request, res: Response): Promise<void> {
    const { name, teamId } = req.body;

    if (!name || !teamId) {
      res.status(400).json({ message: "Nome e teamId são obrigatórios" });
    }

    const project = await projectService.createProject(name, teamId);
    if (!project) {
      res.status(500).json({ message: "Erro ao criar o projeto" });
      return;
    }
    res.status(201).json(project);
  }

  async list(req: Request, res: Response): Promise<void> {
    const { teamId } = req.query;

    if (!teamId || typeof teamId !== "string") {
      res.status(400).json({ message: "Parâmetro teamId é obrigatório" });
      return;
    }

    const projects = await projectService.getProjectsByTeam(teamId);
    res.json(projects);
  }
}
