import { object, string, InferType } from 'yup';

export const changePasswordSchema = object({
  newPassword: string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain 8 characters, one uppercase, one lowercase, one Number and one special case character'
    ),
  oldPassword: string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain 8 characters, one uppercase, one lowercase, one Number and one special case character'
    )
});

type ChangePasswordType = InferType<typeof changePasswordSchema>;

export default ChangePasswordType;
