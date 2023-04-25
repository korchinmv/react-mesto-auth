import MainForm from "./../MainForm";

const Login = ({ title }) => {
  return (
    <>
      <MainForm title={title} nameForm="login" nameButton="Войти" />
    </>
  );
};

export default Login;
