import { FC, MouseEvent } from 'react';
import { useSession, signOut } from 'next-auth/client';
import {
  Box,
  Button,
  Container,
  Flex,
  List,
  ListItem,
  useTheme
} from '@chakra-ui/react';
import Link, { LinkProps } from '../../ui/Link/Link';

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

const handleLogoutClick = (event: MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  signOut();
};

const Header = (): JSX.Element => {
  const theme = useTheme();
  const [session] = useSession();

  return (
    <Box as="header" background="primary.900" boxShadow="md">
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center" height="20">
          <Link href="/" color="white" fontSize="3xl">
            Next Auth
          </Link>
          <Box as="nav">
            <List display="flex" alignItems="center">
              {session ? (
                <>
                  <ListItem marginX="2">
                    <NavLink href="/profile">Profile</NavLink>
                  </ListItem>
                  <ListItem marginX="2">
                    <Button
                      onClick={handleLogoutClick}
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
                </>
              ) : (
                <ListItem marginX="2">
                  <NavLink href="/auth/login">Login</NavLink>
                </ListItem>
              )}
            </List>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
