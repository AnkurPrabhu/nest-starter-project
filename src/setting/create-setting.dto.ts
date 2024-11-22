export class CreateSettingDto {
  name: string;
  value: string;
  dataType: string;
  AccountId: number;
}
export class UpdateSettingDto extends CreateSettingDto {
  settingId: number;
}
export class DeleteSettingDto {
  id: number;
}
