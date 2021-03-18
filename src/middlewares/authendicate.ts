import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

const authenticated = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });

  if (session) {
    req.body.session = session;
    return await handler(req, res);
  }

  res.status(401).json({ message: 'Not authendicated' });
};

export default authenticated;
