import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import parser from 'html-react-parser';
import { FiTrash2 } from 'react-icons/fi';
import { MdOutlineArchive, MdOutlineUnarchive } from 'react-icons/md';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/local-data';
import { showFormattedDate } from '../utils';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundedNote = getNote(id);
    setNote(foundedNote || null);
    setLoading(false);
  }, [id]);

  function onDeleteHandler() {
    const isConfirmed = window.confirm('Apakah Anda yakin ingin menghapus catatan ini?');
    if (isConfirmed) {
      deleteNote(id);
      navigate('/');
    }
  }

  function onArchiveHandler() {
    archiveNote(id);
    navigate('/');
  }

  function onUnarchiveHandler() {
    unarchiveNote(id);
    navigate('/');
  }

  if (loading) {
    return null;
  }

  if (!note) {
    return (
      <section className="not-found-page">
        <h2>Catatan Tidak Ditemukan</h2>
        <p>Catatan yang Anda cari tidak dapat ditemukan atau telah dihapus.</p>
        <Link to="/">Kembali ke Catatan</Link>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{note.title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body">{parser(note.body)}</div>
      <div className="detail-page__action">
        {note.archived ? (
          <button
            className="action"
            type="button"
            title="Aktifkan"
            onClick={onUnarchiveHandler}
          >
            <MdOutlineUnarchive />
          </button>
        ) : (
          <button
            className="action"
            type="button"
            title="Arsipkan"
            onClick={onArchiveHandler}
          >
            <MdOutlineArchive />
          </button>
        )}
        <button
          className="action"
          type="button"
          title="Hapus"
          onClick={onDeleteHandler}
        >
          <FiTrash2 />
        </button>
      </div>
    </section>
  );
}

export default DetailPage;
