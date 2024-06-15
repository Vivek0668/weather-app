import snowy from "./assets/snowyind.gif";
import rainy from "./assets/rain.gif";
import sunny from "./assets/sunnyc.png";
import cloudy from "./assets/cloud.gif";
import Sback from "./assets/sunny.png";
import Mback from "./assets/mist.gif";
import Cback from "./assets/morning-2745.gif";
import Rback from "./assets/thunder-4580.gif";
import Snback from "./assets/snwy.webp";
import loadinggif from "./assets/loading.gif"
import Hback from "./assets/haze.gif";
import Clback from "./assets/sky-4583.gif";
import haze from "./assets/hazec.gif";
import clear from  "./assets/clearc.png";


import { useEffect, useState } from 'react'
import  './Weatherapp.css'



export default function App() {
  const [data,setData] = useState({})
  const[location,setLocation] = useState('')
  const [loading,isLoading] = useState(false)

  

  useEffect(()=> {
    isLoading(true)
  const defaultname =  async() => {
    const defaultloc = "Mumbai"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultloc}&units=Metric&appid=${api_key}`
    const res = await fetch(url);
    const defaultdata = await  res.json();

    
    setData(defaultdata);
    isLoading(false)
    
   

  }
  defaultname();

  }, [])


 const weatherImages = {
Clear : clear, 
Clouds : cloudy,
Rain : rainy,
Snow : snowy,
Haze : haze,
Mist : cloudy,
Sunny : sunny

 }
 const backgroundImages = {
  Sunny : Sback,
  Clear : Clback,
  Rain : Rback,
  Snow : Snback,
  Haze : Hback,
  Mist : Mback,
  Clouds : Cback
 }

 
 const Days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
 const Months = ['Jan', 'Feb', 'Mar', 'Apr','May','Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec']
 const currentDay = Days[new Date().getDay()]
 const currentMonth = Months[new Date().getMonth()]

 const formattedDate = `${currentDay}, ${currentMonth}`

 const mobileBackgrounds = {
  Clear  : ' linear-gradient(to top, #204279 0%, #9b9b9b 100%)',
  Rain  : 'linear-gradient(to bottom, #0f1614 0%, #1f2928 100%)',
  Snow  : ' linear-gradient(to bottom, #5474a0 0%, #f3f5f4 100%)',
  Haze :' linear-gradient(to bottom, #bbc1c4 0%, #676d74 100%)',
  Mist :'linear-gradient(to bottom, #8a8a88 0%, #525753 100%)',
  Clouds :'  linear-gradient(to bottom, #afaf7a 0%, #a5b27c 100%)',
  Sunny : ' linear-gradient(to bottom, #ffcc00 0%, #ffff99 100%)'

 }

const mobileBackground = data.weather? mobileBackgrounds[data.weather[0].main] : null;
 const weatherImage = data.weather ? weatherImages[data.weather[0].main] : null;
 const backgroundImage = data.weather ? backgroundImages[data.weather[0].main] : null;


  

  const api_key = 'bb6cfe649b23ff57077c83f176f74534'

  const input=(e) => {
    setLocation(e.target.value)

  }

  
const search = async() => {
  isLoading(true)
  if(location.trim() !== '') {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`
    const response =  await fetch(url)
    const searchedData = await response.json()
    console.log(searchedData);
    if(searchedData.cod != 200) {
      setData({notfound : true})

    }else {

      setData(searchedData);
    }
    isLoading(false)
  

  }
 
}

const handlekeyevent = (e) => {
  if(e.key === "Enter") {
    search();
  }

}



  return(
    <>
    
  <div style={{
     backgroundImage : `url(${backgroundImage})`,
     backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100vw',
          height: '100vh'
      
  }} className ="container">
    <div  style={{
      backgroundImage: mobileBackground,
     
      
      backgroundPosition: 'center',
      
    }}  className="weather-app">
      <div className = "search">
        <div className = "search-top ">
        <i class="fa-solid fa-location-dot"></i>
        <div className="location">{data.name}</div>
        </div>
        <div className="search-bar">
          <input 
          onChange={(e)=> {
            setLocation(e.target.value)
          }}
          onKeyDown={handlekeyevent}
           type="text" placeholder="Enter Location"
        
          />
          <i class="fa-solid fa-magnifying-glass"
         
         
          onClick={search}></i>


        </div>

       
      </div>
      {loading ? <img  className = "loader" src={loadinggif} alt = "Loading"/> : 
      data.notfound  ? (<div className="not-found ">Not Found 🖾 </div>) :(
        <>
      <div classsName = "weather">
      <img  style={{
        width : 50, height : 40, mixBlendMode : 'multiply'
      }}  src={weatherImage}   alt ="snowy"/>
      <div className="weather-type">{data.weather ? data.weather[0].main : "Weather"}</div>
      <div className = "temp">{data.main ? data.main.temp + "°" : 0}</div>

      </div>
      <div className="weather-date">
        <p>{formattedDate}</p>
      </div>
      <div className="weather-data">
        <div className="humidity">
          <div className="data-name">Humidity</div>
          <i class="fa-solid fa-droplet"></i>
          <div className="data">{data.main  ? data.main.humidity + "%" : "0 %"}</div>
        </div>
        <div className="wind">
          <div className="data-name">Wind</div>
          <i class="fa-solid fa-wind"></i>
          <div className="data">{ data.wind ?  data.wind.speed + " km/h" : "0 km/h"}</div>
        </div>
      </div></>
      ) 
      }
      
     
    </div>
    <div className="footer">
            © Created by Vivek 2024
          </div>
  </div>
 

    </>
  )
   
}