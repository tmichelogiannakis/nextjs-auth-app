import { object, string, InferType } from 'yup';

export const userSchema = object({
  id: string().optional(),
  email: string().email('Invalid email').required('Email is required'),
  password: string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain 8 characters, one uppercase, one lowercase, one Number and one special case character'
    )
});

type UserType = InferType<typeof userSchema>;

export default UserType;
