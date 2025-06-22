import { z } from 'zod';

export const createBoardSchema = z.object({
  name: z.string().min(1, 'Nome do quadro é obrigatório'),
  projectId: z.string().uuid('ID do projeto inválido'),
});

export const updateBoardSchema = z.object({
  name: z.string().min(1, 'Nome do quadro é obrigatório'),
});
