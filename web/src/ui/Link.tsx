import { FC } from 'react';
import NextLink, { LinkProps } from 'next/link';

const ButtonLink: FC<LinkProps> = ({ children, ...rest }) => (
  <NextLink {...rest}>
    <a className="text-lime-800 font-bold hover:underline">{children}</a>
  </NextLink>
);

export default ButtonLink;
