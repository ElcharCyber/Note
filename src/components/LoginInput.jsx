import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';
import localeContent from '../utils/localeContent';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const { locale } = useContext(LocaleContext);
  const content = localeContent[locale];

  function onSubmitHandler(event) {
    event.preventDefault();
    login({ email, password });
  }

  return (
    <form onSubmit={onSubmitHandler} className="input-login">
      <label htmlFor="email">{content.emailLabel}</label>
      <input
        type="email"
        id="email"
        placeholder={content.emailPlaceholder}
        value={email}
        onChange={onEmailChange}
        autoComplete="email"
        required
      />
      <label htmlFor="password">{content.passwordLabel}</label>
      <input
        type="password"
        id="password"
        placeholder={content.passwordPlaceholder}
        value={password}
        onChange={onPasswordChange}
        autoComplete="current-password"
        required
      />
      <button type="submit">{content.loginButton}</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
