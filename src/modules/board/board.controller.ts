import { Request, Response } from "express";
import { BoardService } from "../board/board.service";

const boardService = new BoardService();

export class BoardController {
  async create(req: Request, res: Response): Promise<void> {
    const { name, projectId } = req.body;

    if (!name) {
      res.status(400).json({ message: "O campo 'name' é obrigatórios" });
      return;
    }

    const board = await boardService.createBoard(name, projectId);
    res.status(201).json(board);
  }

  async list(req: Request, res: Response): Promise<void> {
    const { projectId } = req.query;
    if (!projectId || typeof projectId !== "string") {
      res.status(400).json({ message: "projectId é obrigatório" });
      return;
    }

    const boards = await boardService.getBoardsByProject(projectId);
    res.json(boards);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name } = req.body;

    const board = await boardService.updateBoard(id, name);
    res.json(board);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await boardService.deleteBoard(id);
    res.status(204).send();
  }
}
