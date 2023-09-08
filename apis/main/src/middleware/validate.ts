import { validateBody, validateEmail } from '@/lib/input-validators';
import { RequestHandler, MiddlewareCollection } from 'types/app';

interface ValidationHandlers {
  fields(expectedFields: string[], allowNull: boolean): RequestHandler;
  email: RequestHandler;
}

const validationMiddleware: MiddlewareCollection<ValidationHandlers> = () => {
  return {
    fields(expectedFields, allowNull) {
      return (req, res, next) => {
        if (
          !validateBody({
            body: req.body,
            expectedProperties: expectedFields,
            allowNull,
          })
        ) {
          res.status(406).json({
            result: false,
            error: 'Invalid fields',
          });
          return;
        }
        next();
      };
    },
    email(req, res, next) {
      if (!validateEmail(req.body?.email).matches) {
        res.status(406).json({
          result: false,
          error: 'Invalid email',
        });
        return;
      }
      next();
    },
  };
};

export default validationMiddleware;
