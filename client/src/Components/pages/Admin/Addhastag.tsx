import { Button } from "@mui/material";
import React, { useState } from "react";
import { useAction } from "../../../hoocks/useAction";

const Addhastag = () => {
  const { AddHashtag } = useAction();
  const [name, setName] = useState<string>("");
  return (
    <div className="add-hastag">
      name
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <Button
        onClick={() => {
          AddHashtag(name);
          setName("");
        }}
      >
        ADD
      </Button>
    </div>
  );
};

export default Addhastag;
