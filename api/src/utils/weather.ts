import axios from "axios";

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Weather {
  temperatureInDegreesCelcius: number;
  chanceOfRain: number;
}

const API_KEY = process.env.OW_API_KEY;

// location: CAN|TORONTO, THA|BANGKOK
export const getLatLng = async (location: string): Promise<Location> => {
  const formattedLoc = location.split("|").reverse().join(",");

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${formattedLoc}&appid=${API_KEY}&limit=1`;

  try {
    const response = await axios.get(url);

    if (response && response.data && response.data.length > 0) {
      return {
        latitude: response.data[0].lat,
        longitude: response.data[0].lon,
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    latitude: 0,
    longitude: 0,
  };
};

export const getWeather = async (
  location: string,
  date: Date
): Promise<Weather> => {
  const { latitude, longitude } = await getLatLng(location);
  const cnt = Math.floor((date.getTime() - Date.now()) / 1000 / 60 / 60 / 24);
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}`;

  try {
    const response = await axios.get(url);

    if (response && response.data && response.data.daily.length > 0) {
      return {
        temperatureInDegreesCelcius: response.data.daily[cnt].temp.day,
        chanceOfRain: response.data.daily[cnt].pop * 100,
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    temperatureInDegreesCelcius: 0,
    chanceOfRain: 0,
  };
};
