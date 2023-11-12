import React, { useState } from "react";
import "./Home.scss";
import ListCategories from "./ListCategories";

const Home: React.FC = () => {
  const [idSelectCategories, setIdSelectCategories] = useState<number>(0);
  return (
    <div className="home">
      <ListCategories />
      
    </div>
  );
};

export default Home;
