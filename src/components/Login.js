import Header from "./Header";
import { MainForm } from "./MainForm";

export const Login = () => {
  return (
    <>
      <Header register="Регистрация" />
      <MainForm title="Вход" nameForm="login" nameButton="Войти" />
    </>
  );
};
