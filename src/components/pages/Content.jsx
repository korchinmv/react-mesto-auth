import { Profile } from "../Profile";
import { Gallery } from "../Gallery";

const Content = ({
  cards,
  onEditAvatar,
  onEditProfile,
  openConfirmPopup,
  onAddPlace,
  onCardClick,
  onCardLike,
}) => {
  return (
    <>
      <Profile
        onEditAvatar={onEditAvatar}
        onEditProfile={onEditProfile}
        openConfirmPopup={openConfirmPopup}
      />
      <Gallery
        cards={cards}
        onAddPlace={onAddPlace}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
      />
    </>
  );
};

export default Content;
