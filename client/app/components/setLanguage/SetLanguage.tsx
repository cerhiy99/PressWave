'use client'
import React, { useEffect, useState } from "react";
import "./SetLanguage.scss";
import { BsChevronDown } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface itemsInterface {
  id: number;
  src: string;
  code: string;
}

const SetLanguage = () => {
  const pathname=usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const items = [
    { id: 1, src: "/images/FlagEN.png", code: "en" },
    { id: 2, src: "/images/FlagUA.png", code: "ua" },
    { id: 3, src: "/images/FlagIN.png", code: "in" },
  ];
  const [selectedItem, setSelectedItem] = useState<itemsInterface>();
  const [language, setLanguage] = useState<itemsInterface[]>(items.slice(1));

  useEffect(()=>{
    setSelectedItem(items.find((x)=>x.code==pathname.slice(1,3)));
  },[pathname]);
  useEffect(()=>{
    if(selectedItem)setLanguage(items.filter(x=>x.id!=selectedItem?.id))
  },[selectedItem])

  const handleItemClick = (item: itemsInterface) => {
    setSelectedItem(item);
    setIsOpen(false);
    setSelectedItem(item);
    setLanguage(items.filter((element) => element.id !== item.id));
  };

  return (
    !selectedItem?<></>:
    <div className="dropdown-container" onClick={() => setIsOpen(!isOpen)}>
      <div
        className={`dropdown-header ${isOpen ? "dropdown-header-open" : ""}`}
      >
        <img src={selectedItem.src} alt="flag select country" />
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {language.map((item) => (
            <Link key={item.id} href={`/${item.code}${pathname.slice(3)}`}>
              <div
                className="dropdown-item"
                onClick={() => handleItemClick(item)}
              >
                <img src={item.src} alt="flag country" />
              </div>
            </Link>

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
