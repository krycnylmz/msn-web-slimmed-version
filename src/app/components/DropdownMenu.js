import React from 'react';

const DropdownMenu = ({ items, onSelect }) => {
  return (
    <div className="p-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
          onClick={() => onSelect(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
