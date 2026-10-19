import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import LoadingIndicator from '../components/LoadingIndicator';
import { register } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import localeContent from '../utils/localeContent';

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);
  const content = localeContent[locale];

  async function onRegisterHandler(user) {
    setLoading(true);
    const { error } = await register(user);
    setLoading(false);

    if (!error) {
      alert(content.registerSuccess);
      navigate('/');
    }
  }

  return (
    <section className="register-page">
      <h2>{content.registerHeader}</h2>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <RegisterInput register={onRegisterHandler} />
          <p>
            {content.haveAccount}{' '}
            <Link to="/">{content.loginHere}</Link>
          </p>
        </>
      )}
    </section>
  );
}

export default RegisterPage;
