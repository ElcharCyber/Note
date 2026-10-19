const showFormattedDate = (date, locale = 'id') => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const localeTag = locale === 'id' ? 'id-ID' : 'en-US';
  return new Date(date).toLocaleDateString(localeTag, options);
};

export { showFormattedDate };
