import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as auth from '../utils/auth.js';

const Register = () => {

  const navigate = useNavigate();

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
        navigate('/sign-in', {replace: true})
      })
    .catch(err => console.log(err));
  }

  return (
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
  )
}

export default Register;