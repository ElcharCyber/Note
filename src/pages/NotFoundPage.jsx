import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import localeContent from '../utils/localeContent';

function NotFoundPage() {
  const { locale } = useContext(LocaleContext);
  const content = localeContent[locale];

  return (
    <section className="not-found-page">
      <h2>{content.pageNotFoundTitle}</h2>
      <p>{content.pageNotFoundDesc}</p>
      <Link to="/">{content.backToHome}</Link>
    </section>
  );
}

export default NotFoundPage;
