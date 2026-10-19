import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import LoadingIndicator from '../components/LoadingIndicator';
import { getActiveNotes } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import localeContent from '../utils/localeContent';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);
  const content = localeContent[locale];

  const keyword = searchParams.get('title') || '';

  useEffect(() => {
    let isMounted = true;

    async function fetchNotes() {
      setLoading(true);
      const { error, data } = await getActiveNotes();
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
    <section className="homepage">
      <h2>{content.activeNotes}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <NoteList notes={filteredNotes} emptyMessage={content.emptyNotes} />
      )}
      <div className="homepage__action">
        <button
          className="action"
          type="button"
          title={content.addNote}
          onClick={() => navigate('/notes/new')}
          aria-label={content.addNote}
        >
          <FiPlus />
        </button>
      </div>
    </section>
  );
}

export default HomePage;
