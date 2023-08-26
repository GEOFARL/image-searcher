import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { useContext } from 'react';
import { AppContext } from '../../context/context';

import classes from './RootLayout.module.css';

const RootLayout: React.FC = () => {
  const { state } = useContext(AppContext);
  const { theme } = state!;

  return (
    <div
      className={`${classes.theme} ${
        theme === 'dark' ? classes.themeDark : ''
      }`}
    >
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
