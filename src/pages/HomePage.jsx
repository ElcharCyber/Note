import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import { getActiveNotes } from '../utils/local-data';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes] = useState(() => getActiveNotes());
  const navigate = useNavigate();

  const keyword = searchParams.get('title') || '';

  function onKeywordChangeHandler(newKeyword) {
    setSearchParams(newKeyword ? { title: newKeyword } : {});
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <section className="homepage">
      <h2>Catatan Aktif</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} emptyMessage="Tidak ada catatan" />
      <div className="homepage__action">
        <button
          className="action"
          type="button"
          title="Tambah Catatan"
          onClick={() => navigate('/notes/new')}
        >
          <FiPlus />
        </button>
      </div>
    </section>
  );
}

export default HomePage;
