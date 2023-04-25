import logo from "../images/logo.svg";

function Header({ register, login, logout }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__box">
          <img className="header__logo" src={logo} alt="Логотип Mesto" />
          <button className="header__register">{register}</button>
          <button className="header__login">{login}</button>

          <div className="header__user">
            <span className="header__user-name"></span>
            <button className="header__logout">{logout}</button>
          </div>
          {}
        </div>
      </div>
    </header>
  );
}

export default Header;
