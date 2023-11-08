import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./ListCategories.scss";

const ListCategories = () => {
  const listCategories = [
    "Main",
    "Latest",
    "Most popular",
    "Video",
    "Sport",
    "Health",
    "Travel",
    "Culture",
    "Science",
    "1War",
    "M1ain",
    "Late1st",
    "Mo11st popular",
    "Video1",
    "Sport1",
    "Health1",
    "Trave2l",
    "Cult3ure",
    "Scien3ce",
    "War",
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleCategories, setVisibleCategories] = useState<string[]>([]);
  const [hiddenCategories, setHiddenCategories] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(
    document.documentElement.clientWidth
  );

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
    if (containerRef.current) {
      containerRef.current.innerHTML = "";

      for (let i = 0; i < listCategories.length; i++) {
        containerRef.current.innerHTML += `
              <div class="categories">
                <p>${listCategories[i]}</p>
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
          setHiddenCategories(listCategories.slice(i));
          break;
        }
      }
    }
  }, [windowWidth]);

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
