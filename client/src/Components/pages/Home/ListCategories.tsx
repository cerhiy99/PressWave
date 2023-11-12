import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./ListCategories.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { useAction } from "../../../hoocks/useAcrion";

const ListCategories = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hiddenCategories, setHiddenCategories] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
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

  useEffect(() => {
    if (listCategories.length > 0) {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";

        for (let i = 0; i < listCategories.length; i++) {
          containerRef.current.innerHTML += `
              <div class="categories">
                <p>${listCategories[i].name}</p>
              </div>`;
          if (
            (windowWidth > 1024 &&
              containerRef.current.getBoundingClientRect().width >
                windowWidth - windowWidth / 10) ||
            (windowWidth > 768 &&
              containerRef.current.getBoundingClientRect().width >
                windowWidth - windowWidth / 20)
          ) {
            containerRef.current.lastChild?.remove();
            if (listCategories.length >= i) {
              setHiddenCategories(
                listCategories.slice(i).map((item) => String(item.name))
              );
            }
            break;
          }
        }
      }
    }
  }, [windowWidth, listCategories]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="list-categories">
      <div className="list-categories-container">
        <div className="list-categories-value" ref={containerRef}></div>
        {/*visibleCategories.map((x, idx) => (
            <div key={idx} className="categories">
              <p>{x}</p>
            </div>
          ))*/}

        {hiddenCategories.length > 0 && (
          <div className="container-hidden-categories" onClick={toggleDropdown}>
            <div className="icon-dost">
              <BsThreeDotsVertical />
            </div>

            {showDropdown && (
              <div className="dropdown">
                {hiddenCategories.map((x, idx) => (
                  <div key={idx} className="hidden-categories">
                    <p>{x}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCategories;
