import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import * as mestoAuth from "../utils/mestoAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./Header";
import Main from "./Main";
import Content from "./pages/Content";
import Footer from "./Footer";
import ProtectedRouteElement from "./ProtectedRouteElement";
import EditProfilePopup from "./popups/EditProfilePopup";
import EditAvatarPopup from "./popups/EditAvatarPopup";
import AddPlacePopup from "./popups/AddPlacePopup";
import ConfirmPopup from "./popups/ConfirmPopup";
import ImagePopup from "./popups/ImagePopup";
import SuccessPopup from "./popups/SuccessPopup";
import FailPopup from "./popups/FailPopup";
import api from "../utils/Api.js";
import success from "../images/svg/success.svg";
import fail from "../images/svg/fail.svg";

const App = () => {
  const [popupProfileOpen, setPopupProfileOpen] = useState(false);
  const [popupAvatarOpen, setPopupAvatarOpen] = useState(false);
  const [popupCardOpen, setCardPopupOpen] = useState(false);
  const [popupConfirmOpen, setConfirmPopupOpen] = useState(false);
  const [popupImageOpen, setImagePopupOpen] = useState(false);
  const [popupSuccesOpen, setPopupSuccesOpen] = useState(false);
  const [popupFailOpen, setPopupFailOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });
  const navigate = useNavigate();

  const closeAllPopups = () => {
    setPopupProfileOpen(false);
    setPopupAvatarOpen(false);
    setCardPopupOpen(false);
    setConfirmPopupOpen(false);
    setImagePopupOpen(false);
    setPopupSuccesOpen(false);
    setPopupFailOpen(false);
    setSelectedCard({});
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      mestoAuth
        .getUserData(token)
        .then((res) => {
          setUserData({ email: res.data.email });
          setIsLoggedIn(true);
          navigate("/index");
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  const registerUser = (password, email) => {
    mestoAuth
      .registerUser(password, email)
      .then((res) => {
        if (res.token) localStorage.setItem("token", res.token);
        navigate("/index");
        setPopupSuccesOpen(true);
        setIsLoggedIn(true);
        setUserData({ email: res.data.email });
      })
      .catch((err) => {
        setPopupFailOpen(true);
        console.log(err);
      });
  };

  const logOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/sing-in");
  };

  const loginUser = ({ password, email }) => {
    mestoAuth
      .authorizeUser({ password, email })
      .then(() => {
        setIsLoggedIn(true);
        setUserData({ email: email });
        navigate("/index");
      })
      .catch((err) => {
        console.log(err);
        setPopupFailOpen(true);
      });
  };

  useEffect(() => {
    api
      .getUser()
      .then((resp) => setCurrentUser(resp))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((resp) => {
        setCards(resp);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateUser = (data) => {
    setIsLoading(true);

    api
      .sendProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);

    api
      .setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onEditAvatar = () => {
    setPopupAvatarOpen(true);
  };

  const onEditProfile = () => {
    setPopupProfileOpen(true);
  };

  const onAddPlace = () => {
    setCardPopupOpen(true);
  };

  const onDeleteCard = (card) => {
    setSelectedCard(card);
    setConfirmPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (dataForm) => {
    setIsLoading(true);

    api
      .sendCard(dataForm)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardDelete = (card) => {
    setIsLoading(true);

    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          logout="Выйти"
          register="Регистрация"
          login="Войти"
          loggedIn={isLoggedIn}
          logOut={logOut}
          userData={userData}
        />

        <Main>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/index" />
                ) : (
                  <Navigate to="/sign-in" />
                )
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register title="Регистрация" registerUser={registerUser} />
              }
            />
            <Route
              path="/sign-in"
              element={<Login title="Вход" loginUser={loginUser} />}
            />
            <Route
              index
              path="/index"
              element={
                <ProtectedRouteElement
                  element={Content}
                  cards={cards}
                  onEditAvatar={onEditAvatar}
                  onEditProfile={onEditProfile}
                  openConfirmPopup={onDeleteCard}
                  onAddPlace={onAddPlace}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  loggedIn={isLoggedIn}
                />
              }
            />
          </Routes>
        </Main>

        {isLoggedIn && <Footer />}

        <EditProfilePopup
          isOpen={popupProfileOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={popupAvatarOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={popupCardOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmPopup
          isOpen={popupConfirmOpen}
          onClose={closeAllPopups}
          buttonText={"Да"}
          onCardDelete={handleCardDelete}
          card={selectedCard}
          isLoading={isLoading}
        ></ConfirmPopup>

        <ImagePopup
          name="popup-photo"
          card={selectedCard}
          isOpen={popupImageOpen}
          onClose={closeAllPopups}
        />

        <SuccessPopup
          name="success-popup"
          isOpen={popupSuccesOpen}
          onClose={closeAllPopups}
          text="Вы успешно зарегистрировались!"
          image={success}
          alt="Выполнено успешно"
        />

        <FailPopup
          name="fail-popup"
          isOpen={popupFailOpen}
          onClose={closeAllPopups}
          text="Что-то пошло не так!
					Попробуйте ещё раз."
          image={fail}
          alt="Произошла ошибка.."
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
