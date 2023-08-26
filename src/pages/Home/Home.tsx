import { useContext } from 'react';
import { AppContext } from '../../context/context';
import classes from './Home.module.css';
import { home } from '../../constants/uiContent';
import ImageSearcher from '../../components/ImageSearcher/ImageSearcher';

const Home = () => {
  const { state } = useContext(AppContext);
  const { language, theme } = state!;

  return (
    <div className="container">
      <h2
        className={`${classes.heading} ${
          theme === 'dark' ? classes.themeDark : ''
        }`}
      >
        {home.heading.title[language!]}
      </h2>
      <ImageSearcher />
    </div>
  );
};

export default Home;
