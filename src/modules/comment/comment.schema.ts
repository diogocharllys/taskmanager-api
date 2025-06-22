import { z } from 'zod';

export const createCommentSchema = z.object({
  content: z.string().min(1, 'Conteúdo do comentário é obrigatório'),
  cardId: z.string().uuid('ID do card inválido'),
  authorId: z.string().uuid('ID do autor inválido'),
});
