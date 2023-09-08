#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import debug from 'debug';
debug('backend:server');
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import { userRouter } from '@/routes/exports';
import appFactory from './lib/express-util';
import prismaPostgresConnector from 'prisma/connector';

try {
  const datbaseConnection = prismaPostgresConnector(process.env.DB_NAME as string);

  const app = appFactory({
    port: Number(process.env.PORT),
    databaseMapper: datbaseConnection,
    middleware: [logger('dev'), helmet(), cors()],
    routers: [userRouter],
  });

  app.init();
} catch (err) {
  console.error(err);
}
