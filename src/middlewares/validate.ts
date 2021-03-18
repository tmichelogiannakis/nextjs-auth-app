import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';

const validate = (
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) => async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        strict: true
      });
    } catch (error) {
      return res.status(422).json(error);
    }
  }
  return await handler(req, res);
};

export default validate;
