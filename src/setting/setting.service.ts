import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Setting } from '../database/models/models';
import {
  CreateSettingDto,
  DeleteSettingDto,
  UpdateSettingDto,
} from './create-setting.dto';

import { ValidationError } from 'sequelize';

@Injectable()
export class SettingService {
  constructor(
    @Inject('SETTINGS_PROVIDER')
    private settingsRepository: typeof Setting,
  ) {}

  dataTypeValidator(value: string, dataType: string): boolean {
    try {
      return (
        typeof value === dataType || (JSON.parse(value) && dataType === 'json')
      );
    } catch {
      return false;
    }
  }

  async getSetting(settingId: number) {
    const setting = await this.settingsRepository.findByPk(settingId);
    if (!setting) {
      throw new NotFoundException(`Setting not found for id:${settingId}`);
    }
    return setting;
  }

  async createSetting(setting: CreateSettingDto): Promise<any> {
    console.log('creating a new Setting with params :', setting);

    if (this.dataTypeValidator(setting.value, setting.dataType) === false) {
      throw new BadRequestException(
        `invalid request setting value is ${setting.value} and type is ${setting.dataType}`,
      );
    }

    try {
      return await this.settingsRepository.create({
        name: setting.name,
        value: setting.value,
        data_type: setting.dataType,
        account_id: setting.AccountId,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestException(
          error.errors.map((err) => err.message).join(', '),
        );
      }
      console.log('Error', error.message);
      throw new NotFoundException();
    }
  }

  async updateSetting(
    settingUpdatedValues: UpdateSettingDto,
  ): Promise<Setting> {
    if (
      this.dataTypeValidator(
        settingUpdatedValues.value,
        settingUpdatedValues.dataType,
      ) === false
    ) {
      throw new BadRequestException(
        `invalid request setting value is ${settingUpdatedValues.value} and type is ${settingUpdatedValues.dataType}`,
      );
    }
    try {
      const setting = await this.getSetting(settingUpdatedValues.settingId);

      setting.set({
        value: settingUpdatedValues.value,
        name: settingUpdatedValues.name,
        data_type: settingUpdatedValues.dataType,
      });
      return await setting.save();
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestException(
          error.errors.map((err) => err.message).join(', '),
        );
      }
      console.log('Error', error.message);
      throw new NotFoundException();
    }
  }

  async deleteSetting(setting: DeleteSettingDto): Promise<number> {
    try {
      await this.getSetting(setting.id);
      // for now we dont check if the setting belongs to the user
      return await this.settingsRepository.destroy({
        where: { id: setting.id },
      });
    } catch (error) {
      console.log('Error', error.message);
      throw new BadRequestException(error.message);
    }
  }
}
