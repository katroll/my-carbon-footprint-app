const ChartSelector = ({ selectHandler }) => {
  return (
    <select name="charts" id="charts" onChange={selectHandler}>
      <option value="mode-of-transport" defaultChecked>
        CO2 emmissions by mode of transport
      </option>
      <option value="emission-per-km">
        Carbon footprint of travel per kilometer
      </option>
      <option value="tourism-aviation">
        CO2 emissions from aviation per capita
      </option>
    </select>
  );
};

export default ChartSelector;
