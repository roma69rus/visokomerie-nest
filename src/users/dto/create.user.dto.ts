import { ApiProperty } from '@nestjs/swagger';
import {IUserInput} from '../user.model'


export class CreateUserDto implements IUserInput {
  @ApiProperty({example: 'email@mail.ru', description: 'Email'})
  readonly email: string;
  @ApiProperty({example: 'qwerty12345', description: 'Пароль'})
  readonly password: string;
  @ApiProperty({example: 'ADMIN', description: 'Роль'})
  readonly role: string;
}