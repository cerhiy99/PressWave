import { t } from "i18next";
import "./More.scss";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

type Props = {
  src: string;
};

const More = ({ src }: Props) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(src)} className="more-container">
      <div className="more">{t("article.more")}</div>
      <div className="right">
        <FaAngleRight size={35} />
      </div>
    </div>
  );
};

export default More;
