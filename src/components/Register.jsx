import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip.jsx';

const Register = ({ isOpen, onClose }) => {

  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  function closePopup() {
    setInfoTooltipPopupOpen(false);
  }

  const [isRegister, setRegister] = useState({
    status: '',
    message: ''
  });

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(formValue.email, formValue.password)
      .then((res) => {
        if (res.data) {
          console.log(res)
          setFormValue({ email: '', password: '' });
          setInfoTooltipPopupOpen(true);
          setRegister({
            status: true,
            message: 'Вы успешно зарегистрировались!'
          })
        } else {
          setInfoTooltipPopupOpen(true);
          setRegister({
            status: false,
            message: 'Что-то пошло не так! Попробуйте еще раз.'
          })
        };
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className="authorization">
        <h1 className="authorization__header">Регистрация</h1>
        <form className="authorization-form" onSubmit={handleSubmit}>
          <input
            className="authorization-form__input"
            name="email"
            type="email"
            required
            placeholder="Email"
            onChange={handleChange}
          ></input>
          <input
            className="authorization-form__input"
            name="password"
            type="password"
            required
            placeholder="Пароль"
            onChange={handleChange}
          ></input>
          <button className="authorization-form__button">Зарегистрироваться</button>
          <Link className="authorization__link" to="/sign-in">
            Уже зарегистрировались? Войти
          </Link>
        </form>
      </div>
      <InfoTooltip
        name={'info-tooltip'}
        isOpen={isInfoTooltipPopupOpen}
        onClose={closePopup}
        isRegister={isRegister}
      />
    </>
  )
}

export default Register;