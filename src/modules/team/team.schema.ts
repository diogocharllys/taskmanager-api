import { z } from 'zod';

export const createTeamSchema = z.object({
  name: z.string().min(1, 'Nome do time é obrigatório'),
});

export const updateTeamSchema = z.object({
  name: z.string().min(1, 'Nome do time é obrigatório'),
});
