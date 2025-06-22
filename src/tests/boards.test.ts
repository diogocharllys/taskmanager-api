import request from 'supertest';
import app from '../../src/app';

describe('Boards - Integração', () => {
  let token: string;
  let projectId: string;

  beforeAll(async () => {
    await request(app).post('/auth/register').send({
      name: 'User Board',
      email: 'board@test.com',
      password: '123456',
    });

    const loginRes = await request(app).post('/auth/login').send({
      email: 'board@test.com',
      password: '123456',
    });

    token = loginRes.body.token;

    const teamRes = await request(app)
      .post('/teams')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Equipe Boards' });

    const projectRes = await request(app)
      .post('/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Projeto Boards', teamId: teamRes.body.id });

    projectId = projectRes.body.id;
  });

  it('deve criar um board no projeto', async () => {
    const res = await request(app)
      .post(`/projects/:projectId/boards`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Board Principal', projectId });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Board Principal');
  });

  it('deve listar boards do projeto', async () => {
    const res = await request(app)
      .get(`/projects/:projectId/boards?projectId=${projectId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('não deve criar board sem autenticação', async () => {
    const res = await request(app)
      .post(`/projects/:projectId/boards`)
      .send({ name: 'Sem Token', projectId });

    expect(res.status).toBe(401);
  });
});
