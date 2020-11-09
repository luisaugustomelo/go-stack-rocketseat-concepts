import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export default api;

/**
 * iOS com Emulador: localhost
 * iOS com dispotivo físico: IP da máquina
 * Android com Emulador (mapear o porta com o comando abaixo "igual no docker")
 *     - adb reverse tcp:3333 tcp:3333
 * Android com Emulador: 10.0.2.2 (Android Studio)
 * Android com Emulador: 10.0.3.2 (Genymotion)
 * Android com Físico: IP da Máquina
 */