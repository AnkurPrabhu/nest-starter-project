import { Setting } from './models';

export const settingsProviders = [
  {
    provide: 'SETTINGS_PROVIDER',
    useValue: Setting,
  },
];
