import { FC } from 'react';
import NextLink from 'next/link';
import { Text, TextProps } from '@chakra-ui/react';

export type LinkProps = TextProps & {
  href: string;
  target?: string;
};

const Link: FC<LinkProps> = ({ href, children, ...otherProps }) => {
  return (
    <NextLink href={href}>
      <Text as="a" href={href} {...otherProps}>
        {children}
      </Text>
    </NextLink>
  );
};

export default Link;
