import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { string, object } from 'yup';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';

export function validate(
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST' || req.method === 'PUT') {
      try {
        const newSchema =
          req.method === 'POST'
            ? schema
            : schema.concat(object({ id: string().required() }));

        req.body = await newSchema.validate(req.body, {
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
