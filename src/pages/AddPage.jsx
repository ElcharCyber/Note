import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import LoadingIndicator from '../components/LoadingIndicator';
import { addNote } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import localeContent from '../utils/localeContent';

function AddPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);
  const content = localeContent[locale];

  function onTitleChangeHandler(event) {
    setTitle(event.target.value);
  }

  function onBodyInputHandler(event) {
    setBody(event.target.innerHTML);
  }

  async function onSubmitHandler() {
    const trimmedTitle = title.trim();
    const cleanBody = body.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

    if (!trimmedTitle && !cleanBody) {
      alert(content.emptyTitleAndBody);
      return;
    }

    if (!trimmedTitle) {
      alert(content.emptyTitle);
      return;
    }

    if (!cleanBody) {
      alert(content.emptyBody);
      return;
    }

    setLoading(true);
    const { error } = await addNote({ title: trimmedTitle, body });
    setLoading(false);

    if (!error) {
      navigate('/');
    }
  }

  return (
    <section className="add-new-page">
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="add-new-page__input">
            <input
              className="add-new-page__input__title"
              type="text"
              placeholder={content.titlePlaceholder}
              value={title}
              onChange={onTitleChangeHandler}
            />
            <div
              className="add-new-page__input__body"
              data-placeholder={content.bodyPlaceholder}
              contentEditable
              onInput={onBodyInputHandler}
            />
          </div>
          <div className="add-new-page__action">
            <button
              className="action"
              type="button"
              title={content.saveNote}
              onClick={onSubmitHandler}
              aria-label={content.saveNote}
            >
              <FiCheck />
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default AddPage;
