import { ApiProperty } from '@nestjs/swagger';
import {Column, Model, Table, ForeignKey, DataType, CreatedAt, UpdatedAt, DeletedAt, HasMany, BelongsTo, BelongsToMany} from 'sequelize-typescript'
import { Role } from 'src/roles/roles.model';
import { User } from 'src/users/user.model';


// export interface IUserRoleInput {
//   value: string;
//   description: string;
// }


@Table({tableName:"user_roles", timestamps:true, paranoid: true})
export class UserRoles extends Model<UserRoles> {
  @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
  public id!: number;

  @ForeignKey(() => Role)
  @Column({type: DataType.INTEGER,})
  public roleId!: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER,})
  public userId!: number;

  @CreatedAt
  public readonly createdAt!: Date;
  @UpdatedAt
  public readonly updatedAt!: Date;
  @DeletedAt
  public readonly deletedAt!: Date;
}
