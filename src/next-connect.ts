import { NextApiRequest, NextApiResponse } from 'next';
import nc, { NextConnect } from 'next-connect';
import { Session } from 'next-auth/client';
import UserType from './types/user';

export interface ExtendedNextApiRequest extends NextApiRequest {
  session?: Session;
  user?: Partial<UserType>;
}

const nextConnect = (): NextConnect<
  ExtendedNextApiRequest,
  NextApiResponse
> => {
  return nc<ExtendedNextApiRequest, NextApiResponse>({
    onError(error: unknown, req: ExtendedNextApiRequest, res: NextApiResponse) {
      console.error(
        `Error ${req.method}: ${req.url}, body: ${JSON.stringify(req.body)}`
      );
      console.error(error);
      res.status(500).json({ message: `Something went wrong.` });
    },
    onNoMatch(_req: ExtendedNextApiRequest, res: NextApiResponse) {
      res.status(405).json({ message: `Method Not Allowed` });
    }
  });
};

export default nextConnect;
