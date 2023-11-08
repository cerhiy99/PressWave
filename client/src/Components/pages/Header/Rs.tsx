import { useEffect, useState } from "react";
import "./SetLanguage.scss";
import Select from "react-select";
const selectOptions = [
  { value: "EN", label: "English", image: "/images/flag-velikobritanii.jpg" },
  { value: "UA", label: "Українська", image: "/images/flag-Ukraine.jpg" },
];

const selectStyles = {
  container: (provided: any) => ({
    ...provided,
    backgroundColor: "transparent",
  }),
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    backgroundColor: "transparent",
  }),
  input: (provided: any) => ({
    ...provided,
    backgroundColor: "transparent",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    backgroundColor: "transparent",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "transparent" : "transparent",
    color: state.isSelected ? "white" : "black",
    border: "none",
    display: "flex",
    alignItems: "center",
    paddingLeft: 0,
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "white",
    marginLeft: "19px",
    width: "80px",
    border: "none",
  }),
  menuList: (provided: any) => ({
    ...provided,
    backgroundColor: "transparent",
  }),
};
const Rs = () => {
  const [selectLanguage, setSelectLanguage] = useState(selectOptions[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleChange = (selectedOption: any, a: any) => {
    console.log(selectedOption);
    setSelectLanguage(selectedOption);
  };
  useEffect(() => {}, [isMenuOpen]);

  return (
    <div
      onClick={() => {
        console.log(isMenuOpen);
        setIsMenuOpen(!isMenuOpen);
      }}
      className="main-set-language"
    >
      <Select
        options={selectOptions}
        value={selectLanguage}
        onChange={handleChange}
        isSearchable={false}
        components={{ Option: CustomOption, ValueContainer: CustomValue }}
        styles={selectStyles}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
        menuIsOpen={isMenuOpen}
      />
    </div>
  );
};

const CustomOption = ({ innerProps, label, data }: any) => (
  <div {...innerProps} className="custom-option1">
    <img src={data.image} alt={label} className="custom-option-image1" />
  </div>
);

const CustomValue = ({ children }: any) => (
  <img
    src={"/images/flag-velikobritanii.jpg"}
    alt={"flag"}
    className="custom-option-image"
  />
);

export default Rs;
