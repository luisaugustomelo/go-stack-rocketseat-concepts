import ICreateNotificationDTO from '../dtos/ICreateNotificationsDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotifcationsRepository {
    create(data: ICreateNotificationDTO): Promise<Notification>;
}
