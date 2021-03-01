import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dto/IFindAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
    findAllMonthFromProvider(
        data: IFindAllInMonthFromProviderDTO,
    ): Promise<Appointment[]>;
}
