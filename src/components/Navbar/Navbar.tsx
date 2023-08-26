import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';

import { FaMoon, FaSun, FaLanguage, FaBars, FaXmark } from 'react-icons/fa6';
import { useContext, useState } from 'react';
import { languages, navItems } from '../../constants';
import { AppContext } from '../../context/context';

const Navbar = () => {
  const { state, changeLanguage, changeTheme } = useContext(AppContext);
  const { theme, language } = state!;
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div
      className={`${classes.navbar} ${
        theme === 'light' ? classes.navbarLight : classes.navbarDark
      }`}
    >
      <nav className="container">
        <div className={classes.navbar__header}>
          <h1 className={classes.navbar__logo}>
            {language === languages[0].id ? 'Пошуковик' : 'Image'}{' '}
            <span>
              {language === languages[0].id ? 'Зображень' : 'Searcher'}{' '}
            </span>
          </h1>
          <div
            onClick={() => setNavbarOpen((p) => !p)}
            className={classes.navbar__toggle}
          >
            {!navbarOpen ? <FaBars /> : <FaXmark />}
          </div>
        </div>

        <div
          className={`${classes.navbar__content} ${
            !navbarOpen ? classes.navbar__closed : ''
          }`}
        >
          <ul className={classes.navbar__itemsList}>
            {navItems.map((item) => (
              <li key={item.id} className={classes.navbar__item}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `${isActive ? classes.navbar__active : ''} ${
                      classes.navbar__link
                    }`
                  }
                >
                  {language && item.title[language]}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className={classes.navbar__buttons}>
            <button
              onClick={() => {
                setIsLangOpen((prev) => !prev);
              }}
              className={`${classes.navbar__button} ${classes.navbar__buttonLanguage}`}
            >
              <FaLanguage />
              {isLangOpen && (
                <div className={classes.navbar__languageContent}>
                  <ul>
                    {languages.map((lang) => {
                      const activeLang = classes.navbar__activeLang;
                      return (
                        <li
                          key={lang.id}
                          className={`${
                            lang.id === language ? activeLang : ''
                          }`}
                          onClick={() => changeLanguage!(lang.id)}
                        >
                          {lang.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </button>
            <button
              onClick={() => changeTheme!(theme === 'light' ? 'dark' : 'light')}
              className={classes.navbar__button}
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
