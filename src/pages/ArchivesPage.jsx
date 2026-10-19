import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import LoadingIndicator from '../components/LoadingIndicator';
import { getArchivedNotes } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import localeContent from '../utils/localeContent';

function ArchivesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { locale } = useContext(LocaleContext);
  const content = localeContent[locale];

  const keyword = searchParams.get('title') || '';

  useEffect(() => {
    let isMounted = true;

    async function fetchNotes() {
      setLoading(true);
      const { error, data } = await getArchivedNotes();
      if (!error && isMounted) {
        setNotes(data || []);
      }
      if (isMounted) {
        setLoading(false);
      }
    }

    fetchNotes();

    return () => {
      isMounted = false;
    };
  }, []);

  function onKeywordChangeHandler(newKeyword) {
    setSearchParams(newKeyword ? { title: newKeyword } : {});
  }

  const filteredNotes = notes.filter((note) =>
    (note.title || '').toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <section className="archives-page">
      <h2>{content.archivedNotes}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <NoteList notes={filteredNotes} emptyMessage={content.emptyArchive} />
      )}
    </section>
  );
}

export default ArchivesPage;
