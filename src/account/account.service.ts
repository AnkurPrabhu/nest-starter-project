import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ValidationError } from 'sequelize';
import {Account} from "./account.model";
@Injectable()
export class AccountService {
  constructor(
    @Inject('ACCOUNTS_PROVIDER')
    private accountsRepository: typeof Account,
  ) {}

  async createAccount(name: string): Promise<Account> {
    console.log('creating user with name:', name);

    try {
      return await this.accountsRepository.create({ name: name });
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
}
