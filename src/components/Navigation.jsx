import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import { MdGTranslate } from 'react-icons/md';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';
import localeContent from '../utils/localeContent';

function Navigation({ authedUser, onLogout }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale } = useContext(LocaleContext);
  const content = localeContent[locale];

  return (
    <>
      <nav className="navigation">
        <ul>
          {authedUser && (
            <li>
              <NavLink
                to="/archives"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {content.navArchives}
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <button
        className="toggle-locale"
        type="button"
        onClick={toggleLocale}
        title={content.localeTooltip}
        aria-label="Toggle language"
      >
        <MdGTranslate />
        <span className="locale-badge">{locale.toUpperCase()}</span>
      </button>
      <button
        className="toggle-theme"
        type="button"
        onClick={toggleTheme}
        title={theme === 'dark' ? content.themeLightTooltip : content.themeDarkTooltip}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <FiSun /> : <FiMoon />}
      </button>
      {authedUser && (
        <button
          className="button-logout"
          type="button"
          onClick={onLogout}
          title={content.logout}
          aria-label="Logout"
        >
          <FiLogOut />
          <span className="logout-user-name">{authedUser.name}</span>
        </button>
      )}
    </>
  );
}

Navigation.propTypes = {
  authedUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  onLogout: PropTypes.func,
};

export default Navigation;
