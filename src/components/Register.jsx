import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm.js';

const Register = ({ onRegister, onInfoTooltipClick }) => {
  const { formValue, handleChange } = useForm({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValue);
    onInfoTooltipClick();
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
            value={formValue.email}
          ></input>
          <input
            className="authorization-form__input"
            name="password"
            type="password"
            required
            placeholder="Пароль"
            onChange={handleChange}
            value={formValue.password}
          ></input>
          <button className="authorization-form__button">Зарегистрироваться</button>
          <Link className="authorization__link" to="/sign-in">
            Уже зарегистрировались? Войти
          </Link>
        </form>
      </div>
    </>
  )
}

export default Register;