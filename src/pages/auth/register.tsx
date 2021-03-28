import { NextPage } from 'next';
import { Container, Box, Heading } from '@chakra-ui/react';
import Link from '../../components/ui/Link/Link';
import RegisterForm from '../../components/auth/RegisterForm/RegisterForm';

const RegisterPage: NextPage = () => {
  return (
    <Container maxW="md">
      <Box boxShadow="md" padding="4" marginTop="12" borderRadius="md">
        <Heading as="h1" textAlign="center" my="4">
          Create new account
        </Heading>
        <RegisterForm />
      </Box>
      <Box textAlign="right" marginTop="4">
        <Link href="/auth/login">Already have an account</Link>
      </Box>
    </Container>
  );
};

export default RegisterPage;
