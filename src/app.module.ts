import { SequelizeModule } from '@nestjs/sequelize';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Account, Setting } from './database/models/models';
import { AccountModule } from './account/account.module';
import { SettingModule } from './setting/setting.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5455,
      username: 'postgresUser',
      password: 'postgresPW', //Str0ngPa$$w0rd
      database: 'postgresDB',
      models: [Account, Setting],
    }),
    AccountModule,
    SettingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
