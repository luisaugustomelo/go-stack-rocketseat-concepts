import 'reflect-metadata';

import express, { NextFunction, Response, Request } from 'express';
import uploadconfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import databaseConnection from '@shared/infra/typeorm';
import routes from './routes';

async function start() {
    const app = express();
    app.use(express.json());
    app.use('/files', express.static(uploadconfig.directory));
    app.use(routes);
    await databaseConnection();

    app.use(
        (err: Error, request: Request, response: Response, _: NextFunction) => {
            if (err instanceof AppError) {
                return response.status(err.statusCode).json({
                    status: 'error',
                    message: err.message,
                });
            }

            console.log(err);

            return response.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        },
    );

    app.listen(3333, () => {
        console.log('🚀 Server is running on port 3333');
    });
}

start();
