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

const RegisterForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserType>({
    resolver: yupResolver(userSchema)
  });

  const toast = useToast();

  const onSubmit = handleSubmit(({ email, password }) => {
    fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        if (response.status === 500) {
          throw new Error('Something went wrong!');
        }
        return response.json().then(data => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then(() => {
        toast({
          description: 'Successfully registered',
          status: 'success',
          duration: 4000,
          isClosable: true
        });
      })
      .catch(error => {
        toast({
          description: error.message,
          status: 'error',
          duration: 4000,
          isClosable: true
        });
      })
      .finally(() => {
        reset();
      });
  });

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
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;
