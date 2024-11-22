import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './create-account.dto';

@Controller()
export class AccountController {
  constructor(private readonly appService: AccountService) {}

  @Post('/create')
  async createAccount(
    @Body() CreateAccountDto: CreateAccountDto,
  ): Promise<string> {
    console.log('creating account with params:', CreateAccountDto);
    try {
      await this.appService.createAccount(CreateAccountDto.name);
      return 'success';
    } catch {
      return 'Error creating account';
    }
  }
}
