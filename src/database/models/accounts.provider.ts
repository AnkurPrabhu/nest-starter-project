import { Account } from './models';

export const accountsProviders = [
  {
    provide: 'ACCOUNTS_PROVIDER',
    useValue: Account,
  },
];
