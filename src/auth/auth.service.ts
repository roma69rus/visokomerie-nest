import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
    ){}

  async login(userDto: CreateUserDto) {
    throw new Error('Method not implemented.');
  }
  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUsersByEmail(userDto.email)
    if (candidate) {
      throw new HttpException('Пользователь уже зарегистрирован', HttpStatus.BAD_REQUEST )
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.createUser({...userDto, password: hashedPassword})
    return this.generateToken(user)

  }

  async generateToken(user: User) {
    const payload = {email: user.email, id: user.id, roles: user.roles}
    return {
      token: this.jwtService.sign(payload)
    }
  }
}
