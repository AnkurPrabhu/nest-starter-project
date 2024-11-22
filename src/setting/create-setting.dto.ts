export class CreateSettingDto {
  name: string;
  value: string;
  dataType: string;
  accountId: number;
}
export class UpdateSettingDto extends CreateSettingDto {
  settingId: number;
}
export class DeleteSettingDto {
  id: number;
}
