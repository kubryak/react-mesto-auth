import { useForm } from '../hooks/useForm.js';

function Login({ onLogin }) {
  const { formValue, handleChange } = useForm({
    email: '',
    password: ''
  })

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(formValue);
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
        <button className="authorization-form__button">Войти</button>
      </form>
    </div>
  )
}

export default Login;
