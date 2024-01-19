'use client'

import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@mui/material";
import { addTermsOfUse } from "../../functions/additional";

const AddTermsOfUse = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");

  return (
    <div>
      <h1>AddTermsOfUse</h1>
      <p>text1</p>
      <Editor
        value={text1}
        apiKey="t6okxmezjfhajn8bk23u3dkejv0oc9c1qhs7gmmh9qskcfdp"
        onEditorChange={(newText) => setText1(newText)}
      />
      <p>text2</p>
      <Editor
        value={text2}
        apiKey="t6okxmezjfhajn8bk23u3dkejv0oc9c1qhs7gmmh9qskcfdp"
        onEditorChange={(newText) => setText2(newText)}
      />
      <p>text3</p>
      <Editor
        value={text3}
        apiKey="t6okxmezjfhajn8bk23u3dkejv0oc9c1qhs7gmmh9qskcfdp"
        onEditorChange={(newText) => setText3(newText)}
      />
      <Button onClick={() => addTermsOfUse(text1, text2, text3)}>Add</Button>
    </div>
  );
};

export default AddTermsOfUse;
