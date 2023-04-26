import InfoTooltip from "./InfoTooltip";
import usePopupClose from "../../hooks/usePopupClose";

const SuccessPopup = ({ name, isOpen, onClose, text, image, alt }) => {
  usePopupClose(isOpen, onClose);

  return (
    <InfoTooltip
      name={name}
      isOpen={isOpen}
      onClose={onClose}
      text={text}
      image={image}
      alt={alt}
    />
  );
};

export default SuccessPopup;
