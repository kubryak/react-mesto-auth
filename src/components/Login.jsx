import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';

const Login = ({
  handleLoggedIn,
}) => {

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
    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data) {
          handleLoggedIn();
          setFormValue({email: '', password: ''});
          navigate('/', { replace: true });
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="authorization">
      <h1 className="authorization__header">Вход</h1>
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
        <button className="authorization-form__button">Войти</button>
      </form>
    </div>
  )
}

export default Login;
