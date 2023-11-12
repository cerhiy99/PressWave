import { Button } from "@mui/material";
import React, { useState } from "react";
import { useAction } from "../../../hoocks/useAcrion";

const AdminCategories = () => {
  const [lan1, setLan1] = useState<string>("");
  const [lan2, setLan2] = useState<string>("");
  const [lan3, setLan3] = useState<string>("");
  const { AddCategories } = useAction();

  return (
    <div className="categories">
      <h1>добавити категорію</h1>
      lan1
      <input
        value={lan1}
        onChange={(e) => setLan1(e.target.value)}
        type="text"
      />
      lan2
      <input
        value={lan2}
        onChange={(e) => setLan2(e.target.value)}
        type="text"
      />
      lan3
      <input
        value={lan3}
        onChange={(e) => setLan3(e.target.value)}
        type="text"
      />
      <Button
        onClick={() => {
          AddCategories(lan1, lan2, lan3);
        }}
      >
        добавити
      </Button>
    </div>
  );
};

export default AdminCategories;
