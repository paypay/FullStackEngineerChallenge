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

const arg = process.argv && process.argv[2];
async function gen() {
  try {
    const f = await fetch(
      'http://localhost:9090/utils/generate/employees?numb=10'
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
  const connection = await createConnection({
    type: 'sqlite', // specify sqlite type
    synchronize: true, // ask TypeORM to create db tables, if not exists
    database: './src/humanResourceDB.sql', // path to store sql db source
    entities: [path.resolve(__dirname, './entities/**/*.entity{.ts,.js}')] // pattern to autoload entity files
  });

  // 3. Register TypeORM module
  app.register(typeorm, { connection });

  // 4. Register FastifyResty controller
  app.register(bootstrap, {
    controllers: [UtilsController, EmployeeController]
  });

  // 5.cors
  app.register(fastifyCors, {
    origin: ['http://localhost:3000', 'http://localhost:9090']
  });

  // 6. Start application server on port 9090
  app.listen(9090, async (_err, address) => {
    console.log(`Server is listening on ${address}`);
    console.log(app.printRoutes());

    // if generate argument is set, it will generate the start database
    if (arg === '--generate') {
      console.log('generate stuff');
      const genF = await gen();
      console.log(genF);
      if (genF) {
        process.kill(process.pid, 'SIGTERM');
      }
    }
  });

  process.on('SIGTERM', () => {
    app.close();
  });
}

main();
