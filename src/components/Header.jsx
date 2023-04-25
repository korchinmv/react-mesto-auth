import logo from "../images/logo.svg";

function Header({ register, login, logout, loggedIn }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__box">
          <img className="header__logo" src={logo} alt="Логотип Mesto" />
          {/* <button className="header__button">{register}</button> */}

          {loggedIn ? (
            <div className="header__user">
              <span className="header__user-name">asdad@yandex</span>
              <button className="header__button header__button_logout">
                {logout}
              </button>
            </div>
          ) : (
            <button className="header__button">{login}</button>
          )}

          {}
        </div>
      </div>
    </header>
  );
}

export default Header;
