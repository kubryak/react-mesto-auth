import { Link, Route, Routes } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in" >
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up" >
              Регистрация
            </Link>
          }
        />
        <Route />
      </Routes>
    </header>
  )
}
