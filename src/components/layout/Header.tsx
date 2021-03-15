import { FC } from 'react';
import Link, { LinkProps } from '../ui/Link/Link';
import {
  Box,
  Button,
  Container,
  Flex,
  List,
  ListItem,
  useTheme
} from '@chakra-ui/react';

const NavLink: FC<LinkProps> = ({ children, ...otherProps }) => {
  const theme = useTheme();
  return (
    <Link
      fontWeight="700"
      paddingX="4"
      color="white"
      {...otherProps}
      css={{
        '&:hover': {
          color: theme.colors.primary[100]
        }
      }}
    >
      {children}
    </Link>
  );
};

const Header = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Box as="header" background="primary.900" boxShadow="md">
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center" height="20">
          <Link href="/" color="white" fontSize="3xl">
            Next Auth
          </Link>
          <Box as="nav">
            <List display="flex" alignItems="center">
              <ListItem marginX="2">
                <NavLink href="/auth">Login</NavLink>
              </ListItem>
              <ListItem marginX="2">
                <NavLink href="/profile">Profile</NavLink>
              </ListItem>
              <ListItem marginX="2">
                <Button
                  variant="outline"
                  color="white"
                  css={{
                    '&:hover': {
                      background: theme.colors.primary[100],
                      color: theme.colors.gray[900]
                    }
                  }}
                >
                  Logout
                </Button>
              </ListItem>
            </List>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
