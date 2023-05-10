import MainForm from "./../MainForm";

const Login = ({ title, loginUser }) => {
  return (
      <MainForm
        title={title}
        nameForm="login"
        nameButton="Войти"
        loginUser={loginUser}
      />
  );
};

export default Login;
