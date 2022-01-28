import Estimate from "./Estimate";
import "./EmissionPage.css";

const EmissionPage = ({ hideNewForm }) => {
  return (
    <div className={hideNewForm ? "hidden" : "add-new-emission"}>
      <Estimate />
    </div>
  );
};

export default EmissionPage;
