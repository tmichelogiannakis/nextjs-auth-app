import { Container, Text } from '@chakra-ui/react';

const ProfilePage = (): JSX.Element => {
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
    </Container>
  );
};

export default ProfilePage;
