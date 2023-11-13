import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./ListCategories.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { useAction } from "../../../hoocks/useAcrion";

const ListCategories = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hiddenCategories, setHiddenCategories] = useState<
    [{ id: number; name: string }] | []
  >([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isIcon, setIsIcon] = useState(true);
  const [windowWidth, setWindowWidth] = useState<number>(
    document.documentElement.clientWidth
  );
  const [listCategories, setListCategories] = useState<
    [{ id: number; name: string }] | []
  >([]);
  const { categories } = useSelector((state: RootState) => state.categories);

  const { GetCategories } = useAction();

  useEffect(() => {
    setListCategories(categories);
  }, [categories]);

  useEffect(() => {
    GetCategories("UA");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(document.documentElement.clientWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const setHiddenMenu = (index: number) => {
    setHiddenCategories((prevState: any) => {
      if (listCategories.length > 0) {
        return listCategories.slice(index);
      }
      return prevState; // якщо listCategories порожній, повертаємо попередній стан
    });
    if (hiddenCategories.length === 0) {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    if (listCategories.length > 0 && containerRef.current) {
      containerRef.current.innerHTML = "";
      setHiddenCategories([]);

      const newDiv = document.createElement("div");
      newDiv.className = "categories";

      const newParagraph = document.createElement("p");
      if (listCategories[0]) {
        newParagraph.textContent = listCategories[0].name;
        newDiv.appendChild(newParagraph);
        containerRef.current.appendChild(newDiv);
      }
      let index = 0;
      for (let i = 0; i < listCategories.length; i++) {
        if (
          containerRef.current.lastChild instanceof HTMLElement &&
          containerRef.current.lastChild.className === "categories"
        ) {
          const newDiv1 = document.createElement("div");
          newDiv1.className = "retreat";
          containerRef.current.append(newDiv1);
          if (
            (windowWidth > 1024 &&
              containerRef.current.getBoundingClientRect().width >
                windowWidth - windowWidth / 10) ||
            (windowWidth > 768 &&
              containerRef.current.getBoundingClientRect().width >
                windowWidth - windowWidth / 20)
          ) {
            containerRef.current.lastChild?.remove();
          }
        }
        if (
          containerRef.current.lastChild instanceof HTMLElement &&
          containerRef.current.lastChild.className === "retreat"
        ) {
          const newDiv = document.createElement("div");
          newDiv.className = "categories";

          const newParagraph = document.createElement("p");
          newParagraph.textContent = listCategories[i].name;
          newDiv.appendChild(newParagraph);
          containerRef.current.appendChild(newDiv);
          index++;
          if (
            (windowWidth > 1024 &&
              containerRef.current.getBoundingClientRect().width >
                windowWidth - windowWidth / 10) ||
            (windowWidth > 768 &&
              containerRef.current.getBoundingClientRect().width >
                windowWidth - windowWidth / 20)
          ) {
            containerRef.current.lastChild?.remove();
            index--;
            break;
          }
        } else continue;
      }
      setHiddenMenu(index);
    }
  }, [windowWidth, listCategories]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="list-categories">
      <div className="list-categories-container">
        <div className="list-categories-value" ref={containerRef}></div>

        {hiddenCategories.length > 0 && (
          <div className="container-hidden-categories" onClick={toggleDropdown}>
            {isIcon ? (
              <div className="icon-dost">
                <BsThreeDotsVertical />
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
      {showDropdown ? (
        <>
          <div className="line" />
          <div className="dropdown">
            {hiddenCategories.map((x, idx) => (
              <div key={x.id} className="hidden-categories">
                <p>{x.name}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ListCategories;
