import { FC } from 'react';
import { Header } from './header';
import styles from './layout.module.scss';
import clsx from 'clsx';

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className={clsx(styles.main, 'd-flex flex-grow')}>{children}</main>
    </>
  );
};
