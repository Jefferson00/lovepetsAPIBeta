import { container} from 'tsyringe';

import '@modules/users/providers'

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IMailProvaider from './providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from './providers/MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvaider from './providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import IStorageProvider from './providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './providers/StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);

container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository',
    UserTokensRepository,
);

container.registerSingleton<IMailTemplateProvaider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
);
    
container.registerInstance<IMailProvaider>(
    'MailProvider',
    container.resolve(EtherealMailProvider),
);
