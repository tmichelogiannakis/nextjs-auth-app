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
import ChangePasswordType, {
  changePasswordSchema
} from '../../../types/change-password';

const ChangePasswordForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ChangePasswordType>({
    resolver: yupResolver(changePasswordSchema)
  });

  const toast = useToast();

  const onSubmit = handleSubmit(async ({ newPassword, oldPassword }) => {
    fetch('/api/auth/change-password', {
      method: 'PATCH',
      body: JSON.stringify({ newPassword, oldPassword }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return toast({
            description: 'Password updated successfully',
            status: 'success',
            duration: 4000,
            isClosable: true
          });
        }
        if (response.status === 500) {
          throw new Error('Something went wrong!');
        }
        return response.json().then(data => {
          throw new Error(data.message || 'Something went wrong!');
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
        <FormLabel htmlFor="new-password" marginBottom="1">
          New password
        </FormLabel>
        <Input type="password" id="new-password" {...register('newPassword')} />
        {errors.newPassword && (
          <Text color="red.500" textAlign="left" marginTop="1" fontSize="sm">
            {errors.newPassword.message}
          </Text>
        )}
      </FormControl>
      <FormControl padding="2">
        <FormLabel htmlFor="old-password" marginBottom="1">
          Old password
        </FormLabel>
        <Input type="password" id="old-password" {...register('oldPassword')} />
        {errors.oldPassword && (
          <Text color="red.500" textAlign="left" marginTop="1" fontSize="sm">
            {errors.oldPassword.message}
          </Text>
        )}
      </FormControl>
      <Box padding="2" textAlign="center">
        <Button type="submit" colorScheme="primary">
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePasswordForm;
