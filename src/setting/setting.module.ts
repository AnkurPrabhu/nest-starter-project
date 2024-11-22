import { Module } from '@nestjs/common';

import { settingsProviders } from './settings.provider';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';

@Module({
  providers: [...settingsProviders, SettingService],
  controllers: [SettingController],
})
export class SettingModule {}
