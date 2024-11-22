import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { accountsProviders } from '../database/models/accounts.provider';

@Module({
  providers: [...accountsProviders, AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
