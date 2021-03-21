import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from '../../../next-connect';
import validate from '../../../middlewares/validate';
import { saveUser, emailExists } from '../../../data/users';
import { userSchema } from '../../../types/user';

const handler = nextConnect()
  .use(validate(userSchema))
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const userExists = emailExists(req.body.email);
    if (userExists) {
      res.status(422).json({ message: 'User exists already!' });
    } else {
      const newUser = await saveUser(req.body);
      res.status(201).json(newUser);
    }
  });

export default handler;
