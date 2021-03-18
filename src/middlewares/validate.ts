import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';

export function validate(
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
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
    await handler(req, res);
  };
}
