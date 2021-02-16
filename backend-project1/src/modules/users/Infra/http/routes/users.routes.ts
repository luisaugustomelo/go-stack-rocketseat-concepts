import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import { container } from 'tsyringe';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        // @ts-expect-error forçando remoção do password
        delete user.password;
        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        try {
            const updateUserAvatar = container.resolve(UpdateUserAvatarService);
            const user = await updateUserAvatar.execute({
                user_id: request.user.id,
                avatarFilename: request.file.filename,
            });

            // @ts-expect-error forçando remoção do password
            delete user.password;
            return response.json(user);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    },
);

export default usersRouter;
