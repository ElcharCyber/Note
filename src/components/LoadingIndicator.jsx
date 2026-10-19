import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';
import localeContent from '../utils/localeContent';

function LoadingIndicator({ text }) {
  const { locale } = useContext(LocaleContext);
  const loadingText = text || localeContent[locale]?.loading || 'Memuat...';

  return (
    <div className="loading-indicator" role="status" aria-live="polite">
      <div className="loading-spinner" />
      <p className="loading-text">{loadingText}</p>
    </div>
  );
}

LoadingIndicator.propTypes = {
  text: PropTypes.string,
};

export default LoadingIndicator;
