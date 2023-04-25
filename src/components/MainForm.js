import { Link } from "react-router-dom";

export const MainForm = ({ nameForm, nameButton, title }) => {
  return (
    <>
      <h2 className="form-title">{title}</h2>

      <form className="main-form" action="#" name={nameForm}>
        <input
          className="main-form__input"
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          className="main-form__input"
          name="password"
          type="password"
          placeholder="Пароль"
        />

        <button className="main-form__submit" type="submit">
          {nameButton}
        </button>

        <Link to="login">Уже зарегистрированы? Войти</Link>
      </form>
    </>
  );
};
