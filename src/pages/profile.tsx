import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import { Container, Text } from '@chakra-ui/react';
import ChangePasswordForm from '../components/auth/ChangePasswordForm/ChangePasswordForm';

type ProfilePageProps = {
  session: Session;
};

const ProfilePage: NextPage<ProfilePageProps> = ({ session }): JSX.Element => {
  return (
    <Container maxW="container.xl">
      <Text
        as="h1"
        fontSize="7xl"
        fontWeight="700"
        textAlign="center"
        marginY="12"
      >
        Your User Profile
      </Text>
      <Container maxW="md" p="0">
        <ChangePasswordForm />
      </Container>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({
  req
}) => {
  const session: Session | null = await getSession({ req });
  if (session) {
    return { props: { session } };
  }
  return {
    redirect: {
      destination: '/auth/login',
      permanent: false
    }
  };
};

export default ProfilePage;
