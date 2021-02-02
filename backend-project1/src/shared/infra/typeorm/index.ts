import { createConnection } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function databaseConnection() {
    return createConnection();
}

export default databaseConnection;
