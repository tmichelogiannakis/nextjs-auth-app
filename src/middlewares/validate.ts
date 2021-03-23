import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { ValidationError } from 'yup';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';

/*
 * Next connect middleware to validate the request body against the given yup schema
 */
const validate = (schema: OptionalObjectSchema<ObjectShape>) => async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
): Promise<void> => {
  try {
    await schema.validate(req.body, {
      abortEarly: false,
      strict: true,
      stripUnknown: true
    });
    next();
  } catch (error) {
    // if error is a yup validation eror return 422 else throw the error
    if (error instanceof ValidationError) {
      res.status(422).json({
        message: 'Unprocessable Entity',
        errors: error.errors
      });
    } else {
      throw error;
    }
  }
};

export default validate;
