import MainForm from "./../MainForm";

const Register = ({ title }) => {
  return (
    <>
      <MainForm
        title={title}
        nameForm="register"
        nameButton="Зарегистрироваться"
      />
    </>
  );
};

export default Register;
