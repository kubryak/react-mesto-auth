import { useState } from "react";

const Login = ({

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
