import { FC, ReactElement } from 'react';

interface IFProps {
  cond: boolean;
  fallBack?: ReactElement<any, any>;
}

const IF: FC<IFProps> = ({ children, cond, fallBack }) => {
  if (!cond) return fallBack || null;

  return children;
};

export default IF;
