"use client"

import React, { useRef, useEffect } from 'react';

const Popup = ({ isOpen, setIsOpen, children, buttonRef }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen, buttonRef]);

  return (
    isOpen && (
      <div
        ref={popupRef}
        className="absolute right-0 top-0 w-64 bg-white border border-gray-300 shadow-lg z-10"
      >
        {children}
      </div>
    )
  );
};

export default Popup;
