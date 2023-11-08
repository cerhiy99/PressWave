import React, { useState } from "react";
import "./SetLanguage.scss";
import { AiOutlineDown } from "react-icons/ai";
import Select from "react-select";
import { components } from "react-select";

const selectOptions = [
  { value: "EN", label: "English", image: "/images/flag-velikobritanii.jpg" },
  { value: "UA", label: "Українська", image: "/images/flag-Ukraine.jpg" },
];


const SetLanguage = () => {
  const [selectLanguage, setSelectlanguage] = useState("EN");
  /*
  const clickMain = () => {
    if (selectLanguage !== "none") {
      setSelectlanguage("none");
    }
  };
  const clickFlag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectLanguage === "none") {
      setSelectlanguage(e.currentTarget.id);
    }
  };
    */
  const [selectLanguage1, setSelectlanguage1] = useState(selectOptions[0]);

  const clickMain = () => {
    if (selectLanguage !== "none") {
      setSelectlanguage("none");
    }
  };

  const clickFlag = (e: any) => {
    if (selectLanguage === "none") {
      setSelectlanguage(e.currentTarget.id);
    }
  };

  const handleChange = (selectedOption: any) => {
    setSelectlanguage(selectedOption);
  };

  return (
    <div
      className={`main-set-language ${
        selectLanguage === "none" ? "selected" : ""
      }`}
      onClick={clickMain}
    >
      <Select
        options={selectOptions}
        value={selectLanguage1}
        onChange={handleChange}
        isSearchable={false}
        components={{ Option: CustomOption }}
      />
      {/*
      <div className="set-language-container">
        {selectLanguage === "EN" || selectLanguage === "none" ? (
          <div onClick={(e) => clickFlag(e)} id="EN" className="flag">
            <div className="img-flag">
              <img
                src="/images/flag-velikobritanii.jpg"
                alt="flag velikobritanii"
              />
            </div>

            {selectLanguage === "none" ? <></> : <AiOutlineDown />}
          </div>
        ) : (
          <></>
        )}
        {selectLanguage === "none" ? <>&nbsp;</> : <></>}
        {selectLanguage === "UA" || selectLanguage === "none" ? (
          <div onClick={(e) => clickFlag(e)} id="UA" className="flag">
            <div className="img-flag">
              <img src="/images/flag-Ukraine.jpg" alt="flag velikobritanii" />
            </div>
            {selectLanguage === "none" ? <></> : <AiOutlineDown />}
          </div>
        ) : (
          <></>
        )}
        </div>*/}
    </div>
  );
};
const CustomOption = (props: any) => (
  <components.Option {...props}>
    <img
      src={props.data.image}
      alt={props.label}
      style={{ width: "40px", marginRight: "10px" }}
    />
  </components.Option>
);

export default SetLanguage;
