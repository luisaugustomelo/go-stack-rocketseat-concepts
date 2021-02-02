// src/routes/index.ts
import { Router } from 'express';
import appointmentsRouter from '../../modules/appointments/Infra/http/routes/appointments.routes';
import usersRouter from '../../modules/users/Infra/http/routes/users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
