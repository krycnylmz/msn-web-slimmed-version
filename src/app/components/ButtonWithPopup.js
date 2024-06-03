"use client"
import React, { useState, useRef } from 'react';
import Popup from './Popup';

const ButtonWithPopup = ({ button, children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const buttonRef = useRef(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const buttonWithRef = React.cloneElement(button, {
    ref: buttonRef,
    onClick: togglePopup,
  });

  return (
    <div className="relative inline-block">
      {buttonWithRef}
      <Popup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} buttonRef={buttonRef}>
        {children}
      </Popup>
    </div>
  );
};

export default ButtonWithPopup;
