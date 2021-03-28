import { NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { getSession } from 'next-auth/client';
import { ExtendedNextApiRequest } from '../next-connect';

/*
 * Next connect middleware that checks whether the request is authenticated
 * and adds the session object inside request
 */
export const authenticated = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse,
  next: NextHandler
): Promise<void> => {
  const session = await getSession({ req });
  if (session) {
    req.session = session;
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticated;
