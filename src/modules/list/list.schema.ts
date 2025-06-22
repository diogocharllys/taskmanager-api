import { z } from 'zod';

export const createListSchema = z.object({
  title: z.string().min(1, 'Título da lista é obrigatório'),
  boardId: z.string().uuid('ID do quadro inválido'),
});

export const updateListSchema = z.object({
  title: z.string().min(1, 'Título da lista é obrigatório'),
});
