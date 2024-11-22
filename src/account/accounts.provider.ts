import {Account} from "./account.model";


export const accountsProviders = [
  {
    provide: 'ACCOUNTS_PROVIDER',
    useValue: Account,
  },
];
