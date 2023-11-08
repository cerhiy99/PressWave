import React from "react";
import "./Home.scss";
import ListCategories from "./ListCategories";

const Home: React.FC = () => {
  return (
    <div className="home">
      <ListCategories />
    </div>
  );
};

export default Home;
