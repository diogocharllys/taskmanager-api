import { Request, Response } from "express";
import { TeamService } from "../team/team.service";

const teamService = new TeamService();

export class TeamController {
  async create(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { name } = req.body;

    if (!name) res.status(400).json({ message: "Nome é obrigatório" });

    if (!userId) {
      res.status(400).json({ message: "Usuário não autenticado" });
      return;
    }
    const team = await teamService.createTeam(name, userId);
    res.status(201).json(team);
  }

  async list(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
      res.status(400).json({ message: "Usuário não autenticado" });
      return;
    }
    const teams = await teamService.getUserTeams(userId);
    res.json(teams);
  }
}
