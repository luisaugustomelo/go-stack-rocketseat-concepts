// import AppError from '@shared/errors/AppError';

import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUsersTokensRepository = new FakeUserTokensRepository();

        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeUsersTokensRepository,
        );
    });

    it('should be able to reset the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const { token } = await fakeUsersTokensRepository.generate(user.id);

        await resetPassword.execute({
            password: '123123',
            token,
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(updatedUser?.password).toBe('123123');
    });
});
