import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Nome do projeto é obrigatório'),
  teamId: z.string().uuid('ID do time inválido'),
});
