import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: 'employee-performance-backend',
        type: 'mysql',
        host: configService.get('MYSQL_HEROKU_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_HEROKU_USER'),
        password: configService.get('MYSQL_HEROKU_PASSWORD'),
        database: configService.get('MYSQL_HEROKU_DB'),
        logging: true,
        ssl: { rejectUnauthorized: false },
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
        migrationsTableName: 'migration',
        migrations: ['src/migration/*.ts'],
        cli: {
          migrationsDir: 'src/migration',
        },
      }),
    }),
  ],
})
export class DatabaseModule {}