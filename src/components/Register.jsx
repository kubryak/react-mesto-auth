import { Link } from 'react-router-dom';
import { useState } from 'react';

const Register = ({
  title, 
  buttonText, 
  onRegister, 
  }) => {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValue);
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