const Charts = ({ chartSelector }) => {
  const iframeStyle = {
    width: "800px",
    height: "650px",
    border: "5px solid #b9e344",
  };

  return (
    <>
      {chartSelector === "tourism-aviation" ? (
        <iframe
          src="https://ourworldindata.org/grapher/per-capita-co2-aviation-adjusted"
          loading="lazy"
          style={iframeStyle}
          title="aviation-emission"
        ></iframe>
      ) : null}

      {chartSelector === "mode-of-transport" ? (
        <iframe
          src="https://ourworldindata.org/grapher/co2-transport-mode"
          loading="lazy"
          style={iframeStyle}
          title="mode-of-transportation"
        ></iframe>
      ) : null}

      {chartSelector === "emission-per-km" ? (
        <iframe
          src="https://ourworldindata.org/grapher/carbon-footprint-travel-mode"
          loading="lazy"
          style={iframeStyle}
          title="emission-per-km"
        ></iframe>
      ) : null}
    </>
  );
};

export default Charts;
