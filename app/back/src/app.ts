/* eslint-disable promise/prefer-await-to-callbacks */
import * as path from 'path';
import fastify from 'fastify';
import { createConnection } from 'typeorm';
import { bootstrap } from '@fastify-resty/core';
import typeorm from '@fastify-resty/typeorm';
import fastifyCors from 'fastify-cors';
import fetch from 'node-fetch';
import { EmployeeController } from './entities/employee/employee.controller';
import UtilsController from './entities/utils/utils.controller';
export const apiUri = 'http://localhost:9090';
import dotenv from 'dotenv';
import DataController from './entities/data/data.controller';
import waitport from 'wait-port';
import { apiVersionPrefix } from './constants';

const arg = process.argv && process.argv[2];
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function gen() {
  try {
    const f = await fetch(
      `${apiUri}/${apiVersionPrefix}/utils/generate?numb=64`
    );
    const fJson = await f.json();
    return fJson;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function main() {
  // 1. Create fastify server instance
  const app = fastify();

  // 2. Initialize TypeORM connection using sqlite3 module
  const ready = await waitport({ port: Number(process.env['DB_PORT']) });

  if (ready) {
    const connection = await createConnection({
      name: 'default',
      type: 'postgres',
      synchronize: true,
      host: process.env['DB_HOST'],
      password: process.env['DB_PASS'],
      username: process.env['DB_USER'],
      port: Number(process.env['DB_PORT']),
      entities: [path.resolve(__dirname, './entities/**/*.entity{.ts,.js}')] // pattern to autoload entity files
    });

    // 3. Register TypeORM module
    app.register(typeorm, { connection });

    // 4. Register FastifyResty controller
    app.register(bootstrap, {
      controllers: [DataController, UtilsController, EmployeeController]
    });

    // 5.cors
    app.register(fastifyCors, {
      origin: ['http://localhost:3000', 'http://localhost:9090']
    });

    // 6. Start application server on port 9090
    app.listen(9090, async (_err, address) => {
      // if generate argument is set, it will generate the start database
      if (arg === '--generate') {
        const genF = await gen();
        if (genF) {
          process.kill(process.pid, 'SIGTERM');
        }
      } else {
        if (_err) {
          console.log(_err);
          app.close();
          return;
        }
        console.info(`Server is listening on ${address}`);
        console.info(app.printRoutes());
      }
    });
  }

  process.on('SIGTERM', () => {
    console.info('Inserting initial data to the database, please wait...');
    app.close();
  });
}

try {
  main();
} catch (e) {
  console.error(e);
}
