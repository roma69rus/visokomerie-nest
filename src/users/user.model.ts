import { ApiProperty } from '@nestjs/swagger';
import {Column, Model, Table, ForeignKey, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, BelongsTo, BelongsToMany} from 'sequelize-typescript'
import { Role } from 'src/roles/roles.model';
import { UserRoles } from './userRoles.model';


export interface IUserInput {
  email: string;
  password: string;
  role: string;
}


@Table({tableName:"user", timestamps:true, paranoid: true})
export class User extends Model<User, IUserInput> {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
  public id!: number;

  @ApiProperty({example: 'email@mail.ru', description: 'Email'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  public email!: string;

  @ApiProperty({example: '12345', description: 'Пароль'})
  @Column({type: DataType.STRING})
  public password!: string;

  @ApiProperty({example: 'ADMIN', description: 'Роль пользователя'})
  @Column({type: DataType.STRING, defaultValue: "USER"})
  public role!: string;

  @BelongsToMany(() => Role, ()=> UserRoles)
  users: Role[];

  @CreatedAt
  public readonly createdAt!: Date;
  @UpdatedAt
  public readonly updatedAt!: Date;
  @DeletedAt
  public readonly deletedAt!: Date;
}
