import React, { useEffect, useState } from "react";
import { useAction } from "../../../hoocks/useAction";
import { Editor } from "@tinymce/tinymce-react";
import i18n from "../../../utils/i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";

const AddArticles = () => {
  const { AddArticles, GetCategories, GetHashtag } = useAction();
  const [name1, setName1] = useState<string>("");
  const [name2, setName2] = useState<string>("");
  const [name3, setName3] = useState<string>("");
  const [description1, setdescription1] = useState<string>("");
  const [description2, setdescription2] = useState<string>("");
  const [description3, setdescription3] = useState<string>("");
  const [countWatch, setCountWatch] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [image, setImage] = useState<File | any>(null);
  const [isImage, setIsImage] = useState<boolean>(true);
  const [video, setVideo] = useState<File | any>(null);
  const [time, setTime] = useState<string>("");
  const [timeReading, setTimeReading] = useState<string>("");
  const [isHot, setIsHot] = useState<boolean>(false);
  const [isHotMain, setIsHotMain] = useState<boolean>(false);
  const { categories } = useSelector((state: RootState) => state.categories);
  const { hastags } = useSelector((state: RootState) => state.hastag);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedHastags, setSelectedHastags] = useState<string[]>([]);

  useEffect(() => {
    GetCategories(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    GetHashtag();
  }, []);

  const addAricles = () => {
    AddArticles(
      name1,
      name2,
      name3,
      formatDate(date),
      image,
      description1,
      description2,
      description3,
      countWatch,
      isImage,
      video,
      time,
      timeReading,
      isHot,
      isHotMain,
      selectedCategories,
      selectedHastags
    );
  };
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const setCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const idSelectCategory = event.target.id.slice(12);
    const isCategorySet = event.target.checked;
    if (isCategorySet) {
      setSelectedCategories([...selectedCategories, idSelectCategory]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((x) => x != idSelectCategory)
      );
    }
  };

  const setHastag = (event: React.ChangeEvent<HTMLInputElement>) => {
    const idSelectHastag = event.target.id.slice(10);
    const ishastagSet = event.target.checked;
    if (ishastagSet) {
      setSelectedHastags([...selectedHastags, idSelectHastag]);
    } else {
      setSelectedHastags(selectedHastags.filter((x) => x != idSelectHastag));
    }
  };

  return (
    <div className="add-articles">
      <div className="inputs">
        name1
        <input
          type="text"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
        />
        name2
        <input
          type="text"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
        />
        name3
        <input
          type="text"
          value={name3}
          onChange={(e) => setName3(e.target.value)}
        />
        date
        <input
          type="date"
          value={formatDate(date)}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        image
        <input
          type="file"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            console.log(selectedFile);
            setImage(selectedFile);
          }}
        />
        countWatch
        <input
          type="number"
          value={countWatch}
          onChange={(e) => setCountWatch(parseInt(e.target.value))}
        />
        isImage
        <input
          type="checkbox"
          value={isImage.toString()}
          onChange={(e) => setIsImage(e.target.checked)}
        />
        video
        <input
          type="file"
          onChange={(e) => {
            setVideo(e.target.files?.[0]);
          }}
        />
        time
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        timeReading
        <input
          type="text"
          value={timeReading}
          onChange={(e) => setTimeReading(e.target.value)}
        />
        isHot
        <input
          type="checkbox"
          value={isHot.toString()}
          onChange={(e) => setIsHot(e.target.checked)}
        />
        isHotMain
        <input
          type="checkbox"
          value={isHotMain.toString()}
          onChange={(e) => setIsHotMain(e.target.checked)}
        />
      </div>
      categories:
      {categories.slice(3).map((category) => (
        <div key={category.id} className="selectCategories">
          {category.name}
          <input
            id={"category_id_" + category.id.toString()}
            type="checkbox"
            onChange={setCategory}
          />
        </div>
      ))}
      hastags:
      {hastags.map((hastag) => (
        <div key={hastag.id} className="select-hastag">
          {hastag.name}
          <input
            id={"hastag_id_" + hastag.id}
            type="checkbox"
            onChange={setHastag}
          />
        </div>
      ))}
      <Editor
        value={description1}
        apiKey="t6okxmezjfhajn8bk23u3dkejv0oc9c1qhs7gmmh9qskcfdp"
        onEditorChange={(newText) => setdescription1(newText)}
      />
      <Editor
        value={description2}
        apiKey="t6okxmezjfhajn8bk23u3dkejv0oc9c1qhs7gmmh9qskcfdp"
        onEditorChange={(newText) => setdescription2(newText)}
      />
      <Editor
        value={description3}
        apiKey="t6okxmezjfhajn8bk23u3dkejv0oc9c1qhs7gmmh9qskcfdp"
        onEditorChange={(newText) => setdescription3(newText)}
      />
      <button onClick={addAricles}>add</button>
    </div>
  );
};

export default AddArticles;
