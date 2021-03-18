import { v4 as uuid } from 'uuid';
import db from '.';
import UserType from '../types/user';
import { hash } from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

export const findUser = (email: string): UserType => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return db.get('users').find({ email }).write();
};

export const emailExists = (email: string): boolean => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return !!findUser(email);
};

export const saveUser = async (user: UserType): Promise<Partial<UserType>> => {
  const { email } = user;

  const id = uuid();
  const password = await hashPassword(user.password);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  db.get('users').push({ id, email, password }).write();

  return {
    id,
    email
  };
};

export const updateUserPassword = async (
  email: string,
  newPassword: string
): Promise<void> => {
  const password = await hashPassword(newPassword);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  db.get('users').find({ email }).assign({ password }).write();
};
