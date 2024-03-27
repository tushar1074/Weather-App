import React, { useState } from 'react'
import './Weather.css'

const api= {
    key: "b38d296da598d26d175c5b617c6d2d0b",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {

    const [query,setQuery] = useState('');
    const [weather,setWeather]= useState({});

    const search = evt =>{
        if(evt.key === "Enter"){
            fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`).then(res => res.json()).then(result =>{
                setWeather(result);
                setQuery('');
                console.log(result);
            })
        }
    }

    const dateBuilder =(d)=>{
        let months = [
            "January","February","March","April","May","June","July","August","September","October","November","December"
          ];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day=days[d.getDay()];
        let date=d.getDate();
        let month =months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }
 
  return (
    <div className={(typeof weather.main !="undefined") ? ((weather.main.temp >16) ? 'app warm' : 'app'): 'app'}>
        <main>
            <div className='search-box'>
                <input type='text' className='search-bar' placeholder='search...' value={query} onChange={e=>setQuery(e.target.value)} onKeyPress={search}></input>
            </div>
            {(typeof weather.main !="undefined")?(
            <div className='location-box'>
                {weather && (
            <div className='location'>
     {weather.name},{weather.sys.country}
     <div className='date'>
         {dateBuilder(new Date())}
     </div>
 </div>
 )}
 <div className='weather-box'>
     <div className='temp'>
         {Math.round(weather.main.temp)}°C
     </div>
     <div className='weather'>
        {weather.weather[0].main}
     </div>
 </div>
</div>  
            ) : (' ')
            }
           
        </main>
    </div>
  )
}

export default Weather
