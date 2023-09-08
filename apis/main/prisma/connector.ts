import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';

export default function prismaPostgresConnector(dbName: string) {
  try {
    const connection = new PrismaClient();
    if (!connection) throw new Error(`Failed to connect to the "${dbName}" database`);
    console.log(
      `
${
  chalk.yellowBright('Connected to the ') +
  chalk.whiteBright(dbName) +
  chalk.yellowBright(' database')
}
`
    );
    return connection;
  } catch (err) {
    throw new Error(String(err));
  }
}
