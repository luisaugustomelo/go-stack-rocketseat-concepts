import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HasProvider/models/IHasProvider';
import BCryptHashProvider from '@modules/users/providers/HasProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
