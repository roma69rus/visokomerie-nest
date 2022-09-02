import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from "./users/user.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./users/userRoles.model";


@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: process.env.STORAGE,
      // models: [Product, ProductOptions, User, ProductsToCategories, ProductOptionsImages, Category, Slider],
      models: [User, Role, UserRoles],
      logging: console.log,
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
  ]
})
export class AppModule { }