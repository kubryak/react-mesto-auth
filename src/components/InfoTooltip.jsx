import succsessfull from '../images/info-tooltip-successfull.svg';
import unsuccsessfull from '../images/info-tooltip-unsuccessfully.svg';

export default function InfoTooltip({ isOpen, onClose, isRegister }) {

  function handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      onClose();
    }
  }

  return (
    <section className={`popup popup_type_authorization ${isOpen && ('popup_opened')}`} onMouseDown={handleClickClose}>
      <div className="popup__figure-container popup__figure-container_type_register">
        <figure className="popup__figure">
          <img className="popup__image" src={isRegister.status ? succsessfull : unsuccsessfull} alt={isRegister.message} />
          <figcaption className="popup__image-description">{isRegister.message}</figcaption>
        </figure>
        <button type="button" className="popup__close-btn popup__close-btn_type_image" onClick={onClose}></button>
      </div>
    </section>
  )
}