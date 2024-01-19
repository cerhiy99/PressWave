'use client'

import { addHastag } from "../../functions/hestegs";
import { Button } from "@mui/material";
import React, { useState } from "react";

const Addhastag = () => {

  const [name, setName] = useState<string>("");
  return (
    <div className="add-hastag">
      name
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <Button
        onClick={() => {
          addHastag(name);
          setName("");
        }}
      >
        ADD
      </Button>
    </div>
  );
};

export default Addhastag;
