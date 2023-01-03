import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import iconLocation from "../src/assets/ubicacion.jpg";
import iconSpeed from "../src/assets/viento.jpg";
import iconClouds from "../src/assets/nube.jpg"
import iconPressure from "../src/assets/presion.jpg";

import Loader from "./components/Loader";

function App() {
  const [weather, setWeather] = useState({});
  const [isCentigrade, setIsCentigrade] = useState(true);
  const changeValue = () => {
    setIsCentigrade(!isCentigrade);
  };
  
  useEffect(() => {
    changeLoader();
    const options = {
      enableHighAccuracy: true,
      maximumAge: 0,
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const success = (pos) => {

      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const apiKey = "5f1d1183b87579ccafc3c56e9ab51f2e";

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        )
        .then((res) => setWeather(res.data))
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);
  
  console.log("INFO DE LA API", weather);


  let datosDe = weather.weather?.[0].description;
  let fog_ = 'fog';
 
  function fondo (datos) {
    if(datos === fog_) {
      document.body.classList.add("body-change")
    }
    if(datos === 'scattered clouds') {
      document.body.classList.add("body-scattered-clouds")
    }

  }
  fondo(datosDe);  
   

  const [load, setLoad] = useState(true);
  const changeLoader = () => {
    setTimeout(() => {
      setLoad(false);
    }, 5000);
  };

  if (load) {
    return (
        <Loader />
    );
  } else {
    return (
      <div className="App">
        <h1>WEATHER APP</h1>
        <h3 className="h3-location">
          <img className="icon" src={iconLocation} alt="" />
          {weather.sys?.country} {weather.name}
        </h3>
        <div className="card">
          <div className="img-weather">
            <img
              className="img-img-weather"
              src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
              alt=""
            />
            <p className="p-temperature"><b>TEMPERATURE:</b></p>
            <p className="p-value"><b>
              {isCentigrade
                ? Math.round(weather.main?.temp - 273.15) + "°C"
                : Math.round(((weather.main?.temp - 273.15) * 9) / 5 + 32) +
                  "°F"}
            </b></p>
          </div>
          <div className="description-weather">
            <p>" {weather.weather?.[0].description} "</p>
            <p>
              <img className="icon-wind" src={iconSpeed} alt="" />
              WIND SPEED: {weather.wind?.speed}
            </p>
            <p>
              <img className="icon-wind" src={iconClouds} alt="" />
              CLOUDS: {weather.clouds?.all}%</p>
            <p>
              <img className="icon-wind" src={iconPressure} alt="" />
              PRESSURE: {weather.main?.pressure} MB
            </p>
          </div>
        </div>
        <button onClick={changeValue}>
          {isCentigrade ? "CHANGE TO °F" : "CHANGE TO °C"}
        </button>
      </div>
    );
  }
}

export default App;


 