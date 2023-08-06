const getGeoLocation = async (latitude, longitude) => {
  const baseUrl = "http://api.positionstack.com/v1/reverse";
  const apiKey = "d6e64ee38ff455ca2966516fb0b99940";

  const url = `${baseUrl}?access_key=${apiKey}&query=${latitude},${longitude}`;
  const response = await fetch(url, { method: "GET" });
  const jsonData = await response.json();
  return jsonData.data[0];
};

export default getGeoLocation;
