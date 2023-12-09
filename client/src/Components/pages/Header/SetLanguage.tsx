import React, { useEffect, useState } from "react";
import "./SetLanguage.scss";
import { BsChevronDown } from "react-icons/bs";

interface itemsInterface {
  id: number;
  src: string;
  code: string;
}

const SetLanguage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const items = [
    { id: 1, src: "/images/FlagEN.png", code: "EN" },
    { id: 2, src: "/images/FlagUA.png", code: "UA" },
    { id: 3, src: "/images/FlagIN.png", code: "IN" },
  ];
  const [selectedItem, setSelectedItem] = useState<itemsInterface>(items[0]);
  const [language, setLanguage] = useState<itemsInterface[]>(items.slice(1));

  useEffect(() => {}, [language]);

  const handleItemClick = (item: itemsInterface) => {
    setSelectedItem(item);
    setIsOpen(false);
    setSelectedItem(item);
    setLanguage(items.filter((element) => element.id !== item.id));
  };

  return (
    <div className="dropdown-container" onClick={() => setIsOpen(!isOpen)}>
      <div
        className={`dropdown-header ${isOpen ? "dropdown-header-open" : ""}`}
      >
        <img src={selectedItem.src} alt="flag select country" />
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {language.map((item) => (
            <div
              key={item.id}
              className="dropdown-item"
              onClick={() => handleItemClick(item)}
            >
              <img src={item.src} alt="flag country" />
            </div>
          ))}
        </div>
      )}
      <div className={`down-arrow ${isOpen ? "down-arrow-open" : ""}`}>
        <BsChevronDown size={20} />
      </div>
    </div>
  );
};

export default SetLanguage;
