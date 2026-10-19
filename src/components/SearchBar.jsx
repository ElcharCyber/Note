import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';
import localeContent from '../utils/localeContent';

function SearchBar({ keyword, keywordChange }) {
  const { locale } = useContext(LocaleContext);
  const placeholder = localeContent[locale]?.searchPlaceholder || 'Cari berdasarkan judul...';

  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </section>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
