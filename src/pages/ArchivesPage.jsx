import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import { getArchivedNotes } from '../utils/local-data';

function ArchivesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes] = useState(() => getArchivedNotes());

  const keyword = searchParams.get('title') || '';

  function onKeywordChangeHandler(newKeyword) {
    setSearchParams(newKeyword ? { title: newKeyword } : {});
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <section className="archives-page">
      <h2>Catatan Terarsip</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} emptyMessage="Arsip kosong" />
    </section>
  );
}

export default ArchivesPage;
