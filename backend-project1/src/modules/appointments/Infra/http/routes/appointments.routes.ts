import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '../../../services/CreateAppointmentService';

import ensureAuthenticated from '../../../../../middleware/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const CreateAppointment = new CreateAppointmentService(
            appointmentsRepository,
        );

        const appointment = await CreateAppointment.execute({
            date: parsedDate,
            provider_id,
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
