import { NextApiResponse } from 'next';
import { compare } from 'bcrypt';
import nextConnect, { ExtendedNextApiRequest } from '../../../next-connect';
import authenticated from '../../../middlewares/authendicate';
import validate from '../../../middlewares/validate';
import { findUser, updateUserPassword } from '../../../data/users';
import { changePasswordSchema } from '../../../types/change-password';

const handler = nextConnect()
  .use(validate(changePasswordSchema))
  .use(authenticated)
  .patch(async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    const email = req.session?.user?.email;
    if (email) {
      const user = findUser(email);
      if (user) {
        const { newPassword, oldPassword } = req.body;
        const isPasswordValid = await compare(oldPassword, user.password);
        if (isPasswordValid) {
          await updateUserPassword(email, newPassword);
          res.status(204).json({ message: 'Password updated successfully' });
        } else {
          res.status(422).json({ message: 'Wrong old password!' });
        }
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      throw new Error(
        'session or session.user or session.user.email is not present in request'
      );
    }
  });

export default handler;
