import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const autenticateUser = new AuthenticateUserService();

        const { user } = await autenticateUser.execute({
            email,
            password,
        })

        // @ts-expect-error Aqui vai ocorrer um erro, mas estou ignorando
        delete user.password;
        return response.json({ user });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;
