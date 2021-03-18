import { compare } from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { findUser, updateUserPassword } from '../../../data/users';
import { validate } from '../../../middlewares/validate';
import { changePasswordSchema } from '../../../types/change-password';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'PATCH': {
      const session = await getSession({ req });
      if (session) {
        const {
          user: { email }
        } = session;
        const { newPassword, oldPassword } = req.body;

        if (email) {
          const user = findUser(email as string);
          if (user) {
            const isPasswordValid = await compare(oldPassword, user.password);
            if (isPasswordValid) {
              try {
                await updateUserPassword(email, newPassword);
                res
                  .status(204)
                  .json({ message: 'Password updated successfully' });
                break;
              } catch {
                res.status(500).json({ message: 'Something wend wrong' });
              }
              break;
            }

            res.status(422).json({ message: 'Wrong old password!' });
            break;
          }
        }

        res.status(404).json({ message: 'User not found' });
        break;
      }

      res.status(401).json({ message: 'Not authendicated' });
      break;
    }
    default: {
      res.status(405).json({ message: 'Method not allowed' });
      break;
    }
  }
};

export default validate(changePasswordSchema, handler);
