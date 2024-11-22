import {Setting} from "./setting.model";


export const settingsProviders = [
  {
    provide: 'SETTINGS_PROVIDER',
    useValue: Setting,
  },
];
