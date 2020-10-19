import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from './tag/tag.module';
import { ProductsModule } from './products/products.module';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { ValidatorService } from './validator/validator.service';
import { HelperService } from './helper/helper.service';
import { ValidatorModule } from './validator/validator.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [
        __dirname + '/**/*.entity{.ts,.js}'
      ]
    }),
    MulterModule.register({
      dest: 'img'
    }),
    ProductCategoriesModule,
    TagModule,
    ProductsModule,
    UserModule,
    ValidatorModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [ValidatorService, HelperService],
})
export class AppModule {}