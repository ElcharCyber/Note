import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import LoadingIndicator from '../components/LoadingIndicator';
import { login, putAccessToken } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import localeContent from '../utils/localeContent';

function LoginPage({ loginSuccess }) {
  const [loading, setLoading] = useState(false);
  const { locale } = useContext(LocaleContext);
  const content = localeContent[locale];

  async function onLogin({ email, password }) {
    setLoading(true);
    const { error, data } = await login({ email, password });
    setLoading(false);

    if (!error) {
      putAccessToken(data.accessToken);
      loginSuccess();
    }
  }

  return (
    <section className="login-page">
      <h2>{content.loginHeader}</h2>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <LoginInput login={onLogin} />
          <p>
            {content.noAccount}{' '}
            <Link to="/register">{content.registerHere}</Link>
          </p>
        </>
      )}
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
