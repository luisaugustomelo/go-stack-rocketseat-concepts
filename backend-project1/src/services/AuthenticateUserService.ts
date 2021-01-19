import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

/*
* Gerar md5 - www.md5.cz
* Inspecionar Token JWT - jwt.io
*/
interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({email, password}: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email }});

        if(!user) {
            throw new Error('Incorrent email/password combination.');
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new Error('Incorrent email/password combination.');
        }

        const token = sign({ }, '7aa138d69fa9714493ca921dd4b18328', {
            subject: user.id,
            expiresIn: '1d',
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
