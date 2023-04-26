import MainForm from "./../MainForm";

const Register = ({ title }) => {
  return (
    <>
      <MainForm
        title={title}
        nameForm="register"
        nameButton="Зарегистрироваться"
      >
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
      </MainForm>
    </>
  );
};

export default Register;
