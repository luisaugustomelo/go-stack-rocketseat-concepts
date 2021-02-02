import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';
import ICreateAppointmedntDTO from '../../../dto/ICreateAppointmedntDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment || undefined;
    }

    public async create({
        date,
        provider_id,
    }: ICreateAppointmedntDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date });

        await this.ormRepository.save(appointment);
        return appointment;
    }
}

export default AppointmentsRepository;
