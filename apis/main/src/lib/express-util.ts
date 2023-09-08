import express, { RequestHandler } from 'express';
import chalk from 'chalk';
import { RouterInstance, DatabaseMapper, Router } from 'types/app';

interface AppConfig {
  port: number;
  databaseMapper?: DatabaseMapper;
  middleware: RequestHandler[];
  routers: Router[];
}

export default function appFactory({
  port = 8000,
  databaseMapper,
  middleware,
  routers,
}: AppConfig) {
  const app = express();

  const logSeparator = () => {
    console.log(chalk.white('--------------------------------------------------------'));
  };

  const logHeader = () => {
    console.log(chalk.magentaBright('\nExpress API\n'));
  };

  // Function to load middlewares into the Express app
  const loadMiddleware = () => {
    console.log(chalk.green('Loading middlewares...'));
    if (Array.isArray(middleware) && middleware.length > 0) {
      const middlewarePlusDefaults = [
        express.json(),
        express.urlencoded({ extended: false }),
        ...middleware,
      ];
      for (let mdlware of middlewarePlusDefaults) {
        app.use(mdlware);
      }
    } else {
      console.log(chalk.yellow('No additional middlewares to load.'));
    }
  };

  // Function to load routers into the Express app
  const loadRouters = () => {
    console.log(chalk.green('Loading routers...'));
    if (Array.isArray(routers) && routers.length > 0) {
      for (let router of routers) {
        const routerInstance = express.Router();
        const routerConfig = router(
          routerInstance as RouterInstance,
          databaseMapper ? databaseMapper : undefined
        );

        // Initialize routers on router instance
        routerConfig.routers();
        console.log(chalk.blue(`Registered routes at base: ${routerConfig.base}`));
        app.use(routerConfig.base, routerInstance);
      }
    } else {
      console.log(chalk.yellow('No routers to load.'));
    }
  };

  return {
    // Initialize the Express app
    init: () => {
      logHeader();
      loadMiddleware();
      loadRouters();
      logSeparator();
      app.listen(port, () => {
        console.log(
          `${chalk.cyanBright('SERVER LISTENING ON PORT:')} ${chalk.whiteBright(port)}`
        );
        logSeparator();
      });
    },
  };
}
