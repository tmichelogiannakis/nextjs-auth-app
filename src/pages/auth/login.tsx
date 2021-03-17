import { Container, Box, Heading } from '@chakra-ui/react';
import Link from '../../components/ui/Link/Link';
import LoginForm from '../../components/auth/LoginForm/LoginForm';

const LoginPage = (): JSX.Element => {
  return (
    <Container maxW="md">
      <Box boxShadow="md" padding="4" marginTop="12" borderRadius="md">
        <Heading as="h1" textAlign="center" my="4">
          Login
        </Heading>
        <LoginForm />
      </Box>
      <Box textAlign="right" marginTop="4">
        <Link href="/auth/register">Create an account instead</Link>
      </Box>
    </Container>
  );
};

export default LoginPage;
