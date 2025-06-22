import { Request, Response } from "express";
import { ListService } from "../list/list.service";

const listService = new ListService();

export class ListController {
  async create(req: Request, res: Response): Promise<void> {
    const { title, boardId } = req.body;

    if (!title || !boardId) {
      res.status(400).json({ message: "title e boardId são obrigatórios" });
    }

    const list = await listService.createList(title, boardId);
    res.status(201).json(list);
  }

  async list(req: Request, res: Response): Promise<void> {
    const { boardId } = req.query;

    if (!boardId || typeof boardId !== "string") {
      res.status(400).json({ message: "boardId é obrigatório" });
      return;
    }

    const lists = await listService.getListsByBoard(boardId);
    res.json(lists);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title } = req.body;

    const list = await listService.updateList(id, title);
    res.json(list);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await listService.deleteList(id);
    res.status(204).send();
  }
}
