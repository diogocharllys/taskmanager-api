import { z } from 'zod';

export const createHistorySchema = z.object({
  action: z.string().min(1, 'Ação é obrigatória'),
  cardId: z.string().uuid('ID do card inválido'),
});
