import { NextApiRequest, NextApiResponse } from 'next';
import { saveUser, emailExists } from '../../../data/users';
import { validate } from '../../../middlewares/validate';
import { userSchema } from '../../../types/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': {
      if (emailExists(req.body.email)) {
        res.status(422).json({ message: 'User exists already!' });
        break;
      }
      try {
        const newUser = await saveUser(req.body);
        res.status(201).json(newUser);
      } catch {
        res.status(500).json({ message: 'Something wend wrong' });
      }
      break;
    }
    default: {
      res.status(405).json({ message: 'Method not allowed' });
      break;
    }
  }
};

export default validate(userSchema, handler);
