const WorldDataList = ({ name, average }) => {
  return (
    <div className="emission-by-countries">
      <span>{name}</span>
      <span>
        {(Math.round(average * 100 * 2.20462) / 100)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
        lbs
      </span>
    </div>
  );
};

export default WorldDataList;
