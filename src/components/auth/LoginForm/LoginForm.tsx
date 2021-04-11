import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import UserType, { userSchema } from '../../../types/user';
import { useEffect } from 'react';

const LoginForm = (): JSX.Element => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserType>({
    resolver: yupResolver(userSchema)
  });

  const toast = useToast();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const result = await signIn('credentials', {
      callbackUrl: '/',
      redirect: false,
      email,
      password
    });

    if (result.error) {
      reset();
      toast({
        description: result.error,
        status: 'error',
        duration: 4000,
        isClosable: true
      });
    } else {
      router.replace('/profile');
    }
  });

  // Prefetch the profile page
  useEffect(() => {
    router.prefetch('/profile');
  }, []);

  return (
    <Box as="form" onSubmit={onSubmit}>
      <FormControl padding="2">
        <FormLabel htmlFor="email" marginBottom="1">
          Your Email
        </FormLabel>
        <Input type="email" id="email" {...register('email')} />
        {errors.email && (
          <Text color="red.500" textAlign="left" marginTop="1" fontSize="sm">
            {errors.email.message}
          </Text>
        )}
      </FormControl>
      <FormControl padding="2">
        <FormLabel htmlFor="password" marginBottom="1">
          Your password
        </FormLabel>
        <Input type="password" id="password" {...register('password')} />
        {errors.password && (
          <Text color="red.500" textAlign="left" marginTop="1" fontSize="sm">
            {errors.password.message}
          </Text>
        )}
      </FormControl>
      <Box padding="2" textAlign="center">
        <Button type="submit" colorScheme="primary">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
