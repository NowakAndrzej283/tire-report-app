import React from "react";

interface PopupModalProps {
  message: string;
  title?: string;
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({
  message,
  title = "Informacja",
  onClose,
}) => {
  if (!message) return null;

  return (
    <div
      className="popup-overlay"
      onClick={onClose}
    >
      <div
        className="popup-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{title}</h3>

        <p style={{ whiteSpace: "pre-line"}}>
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
        >
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default PopupModal;