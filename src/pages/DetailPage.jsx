import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import parser from 'html-react-parser';
import { FiTrash2 } from 'react-icons/fi';
import { MdOutlineArchive, MdOutlineUnarchive } from 'react-icons/md';
import LoadingIndicator from '../components/LoadingIndicator';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils';
import LocaleContext from '../contexts/LocaleContext';
import localeContent from '../utils/localeContent';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { locale } = useContext(LocaleContext);
  const content = localeContent[locale];

  useEffect(() => {
    let isMounted = true;

    async function fetchNoteDetail() {
      setLoading(true);
      const { error, data } = await getNote(id);
      if (!error && isMounted) {
        setNote(data);
      }
      if (isMounted) {
        setLoading(false);
      }
    }

    fetchNoteDetail();

    return () => {
      isMounted = false;
    };
  }, [id]);

  async function onDeleteHandler() {
    const isConfirmed = window.confirm(content.deleteConfirm);
    if (isConfirmed) {
      setLoading(true);
      await deleteNote(id);
      navigate('/');
    }
  }

  async function onArchiveHandler() {
    setLoading(true);
    await archiveNote(id);
    navigate('/');
  }

  async function onUnarchiveHandler() {
    setLoading(true);
    await unarchiveNote(id);
    navigate('/');
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!note) {
    return (
      <section className="not-found-page">
        <h2>{content.noteNotFoundTitle}</h2>
        <p>{content.noteNotFoundDesc}</p>
        <Link to="/">{content.backToHome}</Link>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{note.title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt, locale)}</p>
      <div className="detail-page__body">{parser(note.body)}</div>
      <div className="detail-page__action">
        {note.archived ? (
          <button
            className="action"
            type="button"
            title={content.unarchiveNote}
            onClick={onUnarchiveHandler}
            aria-label={content.unarchiveNote}
          >
            <MdOutlineUnarchive />
          </button>
        ) : (
          <button
            className="action"
            type="button"
            title={content.archiveNote}
            onClick={onArchiveHandler}
            aria-label={content.archiveNote}
          >
            <MdOutlineArchive />
          </button>
        )}
        <button
          className="action"
          type="button"
          title={content.deleteNote}
          onClick={onDeleteHandler}
          aria-label={content.deleteNote}
        >
          <FiTrash2 />
        </button>
      </div>
    </section>
  );
}

export default DetailPage;
