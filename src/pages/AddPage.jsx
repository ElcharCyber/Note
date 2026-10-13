import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { addNote } from '../utils/local-data';

function AddPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  function onTitleChangeHandler(event) {
    setTitle(event.target.value);
  }

  function onBodyInputHandler(event) {
    setBody(event.target.innerHTML);
  }

  function onSubmitHandler() {
    const trimmedTitle = title.trim();
    const cleanBody = body.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

    if (!trimmedTitle && !cleanBody) {
      alert('Kolom judul dan isi catatan tidak boleh kosong!');
      return;
    }

    if (!trimmedTitle) {
      alert('Kolom judul catatan tidak boleh kosong!');
      return;
    }

    if (!cleanBody) {
      alert('Kolom isi catatan tidak boleh kosong!');
      return;
    }

    addNote({ title: trimmedTitle, body });
    navigate('/');
  }

  return (
    <section className="add-new-page">
      <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          type="text"
          placeholder="Catatan rahasia"
          value={title}
          onChange={onTitleChangeHandler}
        />
        <div
          className="add-new-page__input__body"
          data-placeholder="Sebenarnya saya adalah ...."
          contentEditable
          onInput={onBodyInputHandler}
        />
      </div>
      <div className="add-new-page__action">
        <button
          className="action"
          type="button"
          title="Simpan"
          onClick={onSubmitHandler}
        >
          <FiCheck />
        </button>
      </div>
    </section>
  );
}

export default AddPage;
