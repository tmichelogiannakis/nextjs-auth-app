import { v4 as uuid } from 'uuid';
import db from '.';
import UserType from '../types/user';
import { hash } from 'bcrypt';

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
  const password = await hash(user.password, 16);

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
) => {
  const password = await hash(newPassword, 16);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const user = db.get('users').find({ email }).assign({ password }).write();
};
