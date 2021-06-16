import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ConfigModule } from '@nestjs/config';
import { ReviewModule } from './review/review.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MYSQL_HEROKU_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_HEROKU_USER: Joi.string().required(),
        MYSQL_HEROKU_PASSWORD: Joi.string().required(),
        MYSQL_HEROKU_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
      }),
    }),
    forwardRef(() => EmployeeModule),
    DatabaseModule,
    ReviewModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
