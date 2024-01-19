'use client'
import { $authHost } from "@/app/http";
import React, { useState } from "react";

const AdminCategories = () => {
  const [lan1, setLan1] = useState<string>("");
  const [lan2, setLan2] = useState<string>("");
  const [lan3, setLan3] = useState<string>("");

  const AddCategories=async (name1:string,name2:string,name3:string)=>{
    try{
      const resp=await $authHost.post("categories/add",{name1,name2,name3});
      if(resp.data.status!==200)console.log(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddCategories = () => {
    AddCategories(lan1, lan2, lan3);
  };


  return (
    <div className="categories">
      <h1>Додати категорію</h1>
      
      <input
        placeholder="lan1"
        value={lan1}
        onChange={(e) => setLan1(e.target.value)}
        type="text"
      />
      
      <input
        placeholder="lan2"
        value={lan2}
        onChange={(e) => setLan2(e.target.value)}
        type="text"
      />
      
      <input
        placeholder="lan3"
        value={lan3}
        onChange={(e) => setLan3(e.target.value)}
        type="text"
      />
      
      <button onClick={handleAddCategories}>
        Додати
      </button>
    </div>
  );
};

export default AdminCategories;
