import { z } from 'zod';

export const createCardSchema = z.object({
  title: z.string().min(1, 'Título do card é obrigatório'),
  description: z.string().optional(),
  listId: z.string().uuid('ID da lista inválido'),
  assignedToId: z.string().uuid('ID do usuário inválido').optional(),
});

export const updateCardSchema = z.object({
  title: z.string().min(1, 'Título do card é obrigatório').optional(),
  description: z.string().optional(),
  listId: z.string().uuid('ID da lista inválido').optional(),
  assignedToId: z.string().uuid('ID do usuário inválido').optional(),
});


