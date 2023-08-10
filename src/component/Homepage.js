import React, {useState, useEffect } from 'react'
import './style.css'


export const Homepage = () => {
const [data, setData] = useState({
  celcius: 10,
  name: 'London',
  humidity: 10,
  speed: 2,
  image: 'images/rain.png'
  
})
const [name, setName] = useState('')
const handleChange =(e) => {
  setName(e.target.value)
}
const handleClick = () => {
  if(name !== ""){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=eb81ee7b954783333814e29752f6bd1a&&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      let imagePath = '';
      
      if(data.weather[0].main === 'Cloud'){
        imagePath = 'images/snow.jpeg'
      } else if(data.weather[0].main === 'Clear'){
        imagePath = 'images/clear.png'
      }else if(data.weather[0].main === 'Rain'){
        imagePath = 'images/rain.png'
      } else if(data.weather[0].main === 'Drizzle'){
        imagePath = 'images/moise.png'
      } else{
        imagePath = 'images/humidity.png'
      }
      console.log(data)    
       setData({...data, celcius:data.main.temp, name:data.name, humidity:data.main.humidity, speed:data.wind.speed,
        image: imagePath
      })
    })
  
  }
}

  return (
    <div className='container'>
        <div className='weather'>
            <div className='search'>
                <input type='text' placeholder='Enter City Name' onChange={handleChange}></input>
                <button onClick={handleClick}><img src='images/search.png' className='search-logo'></img></button>
            </div>
            
            <div className='winfo'>
                <img src={data.image} className='snow-icon'></img>
                <h1>{Math.round(data.celcius)}°C</h1>
                <h2>{data.name}</h2>
                <div className='details'>
                <div className='col'>
                  <img src='images/humidity.png' className='hum-icon'></img>
                  <div className='humidity'>
                    <p>{Math.round(data.humidity)}%</p>
                    <p>Humidity</p>
                  </div>
                  <div className='col'>
                    <img src='images/wind.png' className='wind-icon'></img>
                      <div className='wind'>
                        <p>{Math.round(data.speed)}km/h</p>
                        <p>wind</p>
                      </div>
                  </div>
                </div>
                </div>
            </div>
        </div>
        
    </div>
    
    
  )
}
export default Homepage