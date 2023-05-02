import MainForm from "./../MainForm";

const Login = ({ title }) => {
  return (
    <>
      <MainForm title={title} nameForm="login" nameButton="Войти">
        <input
          className="main-form__input"
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <input
          className="main-form__input"
          name="password"
          type="password"
          placeholder="Пароль"
          required
        />
      </MainForm>
    </>
  );
};

export default Login;
