import Appointment from '../Infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dto/ICreateAppointmedntDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
}
