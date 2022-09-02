import { ApiProperty } from '@nestjs/swagger';
import {Column, Model, Table, ForeignKey, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, BelongsTo, BelongsToMany} from 'sequelize-typescript'
import { User } from 'src/users/user.model';
import { UserRoles } from 'src/users/userRoles.model';


export interface IRoleInput {
  value: string;
  description: string;
}


@Table({tableName:"roles", timestamps:true, paranoid: true})
export class Role extends Model<Role, IRoleInput> {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
  public id!: number;

  @ApiProperty({example: 'ADMIN', description: 'Роль пользователя'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  public value!: string;

  @ApiProperty({example: 'Администратор', description: 'Описание роли'})
  @Column({type: DataType.STRING})
  public description!: string;


  @BelongsToMany(() => User, ()=> UserRoles)
  users: User[];
  
  @CreatedAt
  public readonly createdAt!: Date;
  @UpdatedAt
  public readonly updatedAt!: Date;
  @DeletedAt
  public readonly deletedAt!: Date; 
}
