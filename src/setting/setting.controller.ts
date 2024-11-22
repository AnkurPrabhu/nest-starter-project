import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';

import { SettingService } from './setting.service';
import {
  CreateSettingDto,
  DeleteSettingDto,
  UpdateSettingDto,
} from './create-setting.dto';
import { BasicAuthGuard } from '../auth.guard';

@Controller()
@UseGuards(BasicAuthGuard)
export class SettingController {
  constructor(private readonly appService: SettingService) {}

  @Post('/setting/create')
  async createSetting(@Body() settingDto: CreateSettingDto): Promise<string> {
    await this.appService.createSetting(settingDto);
    return 'success';
  }

  @Put('setting/update')
  async updateSetting(
    @Body() UpdateSettingDto: UpdateSettingDto,
  ): Promise<string> {
    await this.appService.updateSetting(UpdateSettingDto);
    return 'success';
  }

  @Delete('setting/delete')
  async deleteSetting(@Body() setting: DeleteSettingDto): Promise<string> {
    await this.appService.deleteSetting(setting);
    return 'success';
  }
}
