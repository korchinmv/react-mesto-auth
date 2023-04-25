import { Link } from "react-router-dom";

const MainForm = ({ nameForm, nameButton, title }) => {
  return (
    <div className="container">
      <form className="main-form" action="#" name={nameForm}>
        <h2 className="main-form__title">{title}</h2>

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
    </div>
  );
};

export default MainForm;
