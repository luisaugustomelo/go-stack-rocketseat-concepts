import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dto/ICreateUserDTO';
import IFindAllProviders from '../dto/IFindAllProvidersDTO';

export default interface IUsersRepository {
    findAllProviders(data: IFindAllProviders): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}
