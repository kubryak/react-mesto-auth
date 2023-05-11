import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Header from './Header.jsx';
import Main from './Main.jsx'
import Footer from './Footer.jsx';
import ImagePopup from './ImagePopup.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddCardPopup from './AddCardPopup.jsx';
import DeleteCardPopup from './DeleteCardPopup.jsx';

import ProtectedRouteElement from './ProtectedRoute.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import * as auth from '../utils/auth.js';

import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import { CardContext } from '../contexts/CardContex.jsx';

export default function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditAddPlacePopupOpen, setEditAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [deletedCard, setDeletedCard] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: '', _id: '' });
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) setToken(jwt);

    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err));
    api.getCards()
      .then((res) => {
        setCards(res);
      })
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    const close = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    }
    if (isEditProfilePopupOpen || isEditAvatarPopupOpen || isEditAddPlacePopupOpen || isImagePopupOpen || isDeleteCardPopupOpen) {
      document.addEventListener('keydown', close)
    }
    return () => {
      document.removeEventListener('keydown', close)
    }
  }, [isEditProfilePopupOpen, isEditAvatarPopupOpen, isEditAddPlacePopupOpen, isImagePopupOpen, isDeleteCardPopupOpen])

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setEditAddPlacePopupOpen(true);

  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleDeleteCardClick(card) {
    setDeletedCard(card);
    setDeleteCardPopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete() {
    setIsLoading(true);
    api.deleteCard(deletedCard._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== deletedCard._id))
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateUser(name, description) {
    setIsLoading(true);
    api.setUserInfo(name, description)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.setNewAvatar(avatar)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddCard(card) {
    setIsLoading(true);
    api.addNewCard(card)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setDeleteCardPopupOpen(false);
  }

  function handleLoggedIn() {
    setLoggedIn(true);
  }

  function logOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setToken('');
    setUserData({ email: '', _id: '' });
    navigate('/sign-in', { replace: true });
  }

  useEffect(() => {
    handleTokenCheck();
  }, [])

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate('/', { replace: true })
        }
      });
    };
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <div className='page'>
          <Header />
          <Routes>
            <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" replace />} />
            <Route path="/sign-in" element={<Login handleLoggedIn={handleLoggedIn} />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/" element={
              <ProtectedRouteElement element={Main}
                  loggedIn={isLoggedIn}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleDeleteCardClick}
                  onCardLike={handleCardLike}
                />}
              />
          </Routes>
          {isLoggedIn && <Footer />}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
          />
          <AddCardPopup
            isOpen={isEditAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCard={handleAddCard}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
          />
          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            handleCardDelete={handleCardDelete}
            buttonText={isLoading ? 'Удаление...' : 'Да'}
          />
          <ImagePopup
            name={'image'}
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}
