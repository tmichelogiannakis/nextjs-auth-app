import { compare } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { findUser, updateUserPassword } from '../../../data/users';
import authenticated from '../../../middlewares/authendicate';
import { validate } from '../../../middlewares/validate';
import { changePasswordSchema } from '../../../types/change-password';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'PATCH': {
      const {
        session: {
          user: { email }
        },
        newPassword,
        oldPassword
      } = req.body;

      const user = findUser(email);
      if (user) {
        const isPasswordValid = await compare(oldPassword, user.password);
        if (isPasswordValid) {
          try {
            await updateUserPassword(email, newPassword);
            res.status(204).json({ message: 'Password updated successfully' });
            break;
          } catch {
            res.status(500).json({ message: 'Something wend wrong' });
          }
          break;
        }

        res.status(422).json({ message: 'Wrong old password!' });
        break;
      }

      res.status(404).json({ message: 'User not found' });
      break;
    }
    default: {
      res.status(405).json({ message: 'Method not allowed' });
      break;
    }
  }
};

export default authenticated(validate(changePasswordSchema, handler));
