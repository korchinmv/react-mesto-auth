import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";

const MainForm = ({ nameForm, nameButton, title, loginUser, registerUser }) => {
  const { form, handleChange } = useForm({
    password: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = form;
    if (nameForm === "register") {
      registerUser(password, email);
      return;
    }
    loginUser(password, email);
  };

  return (
    <div className="container">
      <form
        className="main-form"
        action="#"
        name={nameForm}
        onSubmit={handleSubmit}
      >
        <h2 className="main-form__title">{title}</h2>

        <input
          className="main-form__input"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="main-form__input"
          name="password"
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="main-form__submit hover" type="submit">
          {nameButton}
        </button>

        {nameForm === "register" && (
          <Link className="main-form__sign hover" to="/sign-in">
            Уже зарегистрированы? Войти
          </Link>
        )}
      </form>
    </div>
  );
};

export default MainForm;
