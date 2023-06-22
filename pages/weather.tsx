import {useState,useEffect} from "react";
async function getData() {
    const apiKey = "84f6bdd7f42d1d8dc8c20f8687898762";
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`);
  
    // Recommendation: handle errors
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    const data = await res.json();
    return data;
  }
  
  export default function Page() {
    return (
      <main>
        <h1>Weather Data</h1>
        <WeatherData />
      </main>
    );
  }
  
  function WeatherData() {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const weatherData = await getData();
          setData(weatherData);
        } catch (error) {
          console.log('Error fetching weather data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        {data ? (
          <>
            <p>Temperature: {data.main.temp}</p>
            <p>Description: {data.weather[0].description}</p>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    );
  }
  