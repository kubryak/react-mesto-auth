import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

const Register = ({ onRegister, onInfoTooltipClick }) => {

  const { values, handleChange, errors } = useFormAndValidation();

  const { email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
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
            value={email || ''}
            minLength='5'
          ></input>
          <span className="authorization__input-error authorization__input-error_active">
            {errors.email}
          </span>
          <input
            className="authorization-form__input"
            name="password"
            type="password"
            required
            placeholder="Пароль"
            onChange={handleChange}
            value={password || ''}
          ></input>
          <span className="authorization__input-error popup__link-error authorization__input-error_active">
            {errors.password}
          </span>
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
