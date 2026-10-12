import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiSun, FiMoon } from 'react-icons/fi';

function Navigation({ theme, toggleTheme }) {
  return (
    <>
      <nav className="navigation">
        <ul>
          <li>
            <NavLink
              to="/archives"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Arsip
            </NavLink>
          </li>
        </ul>
      </nav>
      {toggleTheme && (
        <button
          className="toggle-theme"
          type="button"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
        >
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
      )}
    </>
  );
}

Navigation.propTypes = {
  theme: PropTypes.string,
  toggleTheme: PropTypes.func,
};

export default Navigation;
