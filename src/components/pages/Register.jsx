import MainForm from "./../MainForm";

const Register = ({ title, registerUser }) => {
  return (
      <MainForm
        title={title}
        nameForm="register"
        nameButton="Зарегистрироваться"
        registerUser={registerUser}
      />
  );
};

export default Register;
