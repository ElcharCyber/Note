import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';
import localeContent from '../utils/localeContent';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const { locale } = useContext(LocaleContext);
  const content = localeContent[locale];

  function onSubmitHandler(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert(content.passwordMismatch);
      return;
    }

    if (password.length < 6) {
      alert(content.passwordMinLength);
      return;
    }

    register({ name, email, password });
  }

  return (
    <form onSubmit={onSubmitHandler} className="input-register">
      <label htmlFor="name">{content.nameLabel}</label>
      <input
        type="text"
        id="name"
        placeholder={content.namePlaceholder}
        value={name}
        onChange={onNameChange}
        autoComplete="name"
        required
      />
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
        autoComplete="new-password"
        required
      />
      <label htmlFor="confirmPassword">{content.confirmPasswordLabel}</label>
      <input
        type="password"
        id="confirmPassword"
        placeholder={content.confirmPasswordPlaceholder}
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        autoComplete="new-password"
        required
      />
      <button type="submit">{content.registerButton}</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
