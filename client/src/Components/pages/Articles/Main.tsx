import React, { useState } from "react";
import "./Main.scss";
import ListCategories from "./ListCategories";
import BlockMain from "./BlockMain";

const Main: React.FC = () => {
  const [idSelectCategories, setIdSelectCategories] = useState<number>(0);
  return (
    <div className="home">
      <ListCategories />
      <BlockMain />
    </div>
  );
};

export default Main;
