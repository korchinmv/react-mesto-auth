import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./Header";
import Main from "./Main";
import Content from "./pages/Content";
import Footer from "./Footer";
import EditProfilePopup from "./popups/EditProfilePopup";
import EditAvatarPopup from "./popups/EditAvatarPopup";
import AddPlacePopup from "./popups/AddPlacePopup";
import ConfirmPopup from "./popups/ConfirmPopup";
import ImagePopup from "./popups/ImagePopup";
import api from "../utils/Api.js";

const App = () => {
  const [popupProfileOpen, setPopupProfileOpen] = useState(false);
  const [popupAvatarOpen, setPopupAvatarOpen] = useState(false);
  const [popupCardOpen, setCardPopupOpen] = useState(false);
  const [popupConfirmOpen, setConfirmPopupOpen] = useState(false);
  const [popupImageOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const closeAllPopups = () => {
    setPopupProfileOpen(false);
    setPopupAvatarOpen(false);
    setCardPopupOpen(false);
    setConfirmPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({});
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
        <Header />

        <Main>
          <Routes>
            <Route
              path="/"
              element={
                <Content
                  cards={cards}
                  onEditAvatar={onEditAvatar}
                  onEditProfile={onEditProfile}
                  openConfirmPopup={onDeleteCard}
                  onAddPlace={onAddPlace}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/sign-in" element={<Login />} />
          </Routes>
        </Main>

        <Footer />

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
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
