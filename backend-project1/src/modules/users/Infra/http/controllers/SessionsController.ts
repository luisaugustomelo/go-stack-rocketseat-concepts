import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const { email, password } = request.body;

            const autenticateUser = container.resolve(AuthenticateUserService);

            const { user, token } = await autenticateUser.execute({
                email,
                password,
            });

            // @ts-expect-error forçando remoção do password
            delete user.password;
            return response.json({ user, token });
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}
