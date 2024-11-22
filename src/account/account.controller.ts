import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './create-account.dto';

@Controller('/account')
export class AccountController {
  constructor(private readonly appService: AccountService) {}

  @Post()
  async createAccount(
    @Body() CreateAccountDto: CreateAccountDto,
  ): Promise<string> {
    console.log('creating account with params:', CreateAccountDto);
      await this.appService.createAccount(CreateAccountDto.name);
      return 'success';

  }
}
