import { ControllerCollection } from 'types/app';

const userController: ControllerCollection = (db) => {
  return {
    async register(req, res, next) {
      res.status(200).json({ result: true, message: 'Registerd user successfully' });
      return;
    },
  };
};

export default userController;
