import { Container, Text } from '@chakra-ui/react';

const Home = (): JSX.Element => {
  return (
    <Container maxW="container.xl">
      <Text
        as="h1"
        fontSize="7xl"
        fontWeight="700"
        textAlign="center"
        marginY="12"
      >
        Welcome on Board!
      </Text>
    </Container>
  );
};

export default Home;
