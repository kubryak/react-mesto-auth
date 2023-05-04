import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import { useInput } from '../utils/useInput.js';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageDescription, setErrorMessageDescription] = useState('');

  const userName = useInput('', { isEmpty: true, minLength: 2 });
  const userDescription = useInput('', { isEmpty: true, minLength: 2 });

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen]);

  useEffect(() => {
    userName.setInputValid(true);
    userDescription.setInputValid(true);
    setErrorMessageName('');
    setErrorMessageDescription('');
  }, [onClose])

  function handleNameChange(e) {
    setName(e.target.value);
    userName.onChange(e);
    setErrorMessageName(e.target.validationMessage);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    userDescription.onChange(e);
    setErrorMessageDescription(e.target.validationMessage);
  }

  function handleSubmitProfile(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitProfile}
      buttonText={buttonText}
      onDisabled={!userName.inputValid || !userDescription.inputValid}
    >
      <input
        type="text"
        className="popup__input popup__input_type_name"
        name="name" placeholder="Введите имя"
        id="popup__name"
        value={name || ''}
        onChange={handleNameChange}
        required
        minLength="2"
        maxLength="40"
        onFocus={userName.onFocus}
      />
      {(
        (userName.isDirty && userName.isEmpty) ||
        (userName.isDirty && userName.minLengthError)) &&
        <span className="popup__input-error popup__name-error popup__input-error_active">
          {errorMessageName}
        </span>
      }
      <input
        type="text"
        className="popup__input popup__input_type_description"
        name="description"
        placeholder="Введите описание"
        id="popup__description"
        value={description || ''}
        onChange={handleDescriptionChange}
        required
        minLength="2"
        maxLength="200"
        onFocus={userDescription.onFocus}
      />
      {(
        (userDescription.isDirty && userDescription.isEmpty) ||
        (userDescription.isDirty && userDescription.minLengthError)) &&
        <span className="popup__input-error popup__description-error popup__input-error_active">
          {errorMessageDescription}
        </span>
      }
    </PopupWithForm>
  )
}