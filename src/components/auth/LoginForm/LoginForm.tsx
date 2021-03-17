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

const LoginForm = (): JSX.Element => {
  const { register, handleSubmit, errors, reset } = useForm<UserType>({
    resolver: yupResolver(userSchema)
  });

  const toast = useToast();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    });
    reset();
    if (result.error) {
      toast({
        description: result.error,
        status: 'error',
        duration: 4000,
        isClosable: true
      });
    }
  });

  return (
    <Box as="form" onSubmit={onSubmit}>
      <FormControl padding="2">
        <FormLabel htmlFor="email" marginBottom="1">
          Your Email
        </FormLabel>
        <Input type="email" id="email" name="email" ref={register} />
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
        <Input type="password" id="password" name="password" ref={register} />
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
