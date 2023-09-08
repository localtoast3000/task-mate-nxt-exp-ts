import { validationMiddleware } from '@/middleware/exports';
import userController from '@/controllers/user';
import { Router } from 'types/app';

const userRouter: Router = (router, db) => {
  const validate = validationMiddleware(db);
  const controller = userController(db);

  return {
    base: '/user',
    routers: () => {
      router.post(
        '/',
        validate.fields(['firstname', 'lastname', 'email', 'password'], false),
        validate.email,
        controller.register
      );
    },
  };
};

export default userRouter;
