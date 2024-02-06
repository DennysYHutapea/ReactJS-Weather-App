import React, { useState } from 'react'
import { useRef } from "react";
import { FaBars, FaTimes, FaSearch} from "react-icons/fa"
import axios from "axios";


function App() {
    const navRef = useRef()

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
  
    const searchLocation = (event) => {
      if (event.key === 'Enter') {
        axios.get(url).then((response) => {
          setData(response.data)
          console.log(response.data)
        })
        setLocation('')
      }
    }

    return (
      <div className="Page">
          <header>
            <h3>Weather App</h3>
            <nav ref = {navRef}>
                <a href='/#'>Home</a>
                <a href='/#'>My Work</a>
                <a href='/#'>Blog</a>
                <a href='/#'>About me</a>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <div className="search-box">
              <input
                value={location}
                onChange={event => setLocation(event.target.value)}
                onKeyPress={searchLocation}
                placeholder='Select a City'
                type="text" />
                <button type="submit"><FaSearch/></button>
            </div>
            <button className="nav-btn nav-open-btn" onClick={showNavbar}> 
                <FaBars/>
            </button>
        </header>

        <div className="content">
          <div className="top">
            <div className='greetings'>
              <h1>Welcome to Weather App!!</h1>
              <h3>Choose your location on search bar!!</h3>
            </div>
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>Feels like : {data.main.feels_like.toFixed()}°F</p> : null}
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>Humidity : {data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>Wind speed : {data.wind.speed.toFixed()} MPH</p> : null}
            </div>
          </div>
        }
         </div>
         
    <footer>
      <p class="copyright">
      Bengkel Radio IMT 2022. All rights reserved.
      </p>
      <ul class="social-media" id="biografi">
        <li>
          <a
            href="https://www.linkedin.com/company/bengkel-radio-imt-signum-itb/about/"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png"
              width="50px"
              alt="Logo LinkedIn"
            />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/bengkradimt/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/2048px-Instagram_logo_2022.svg.png"
              width="50px"
              alt="Logo Instagram"
            />
          </a>
        </li>
      </ul>
    </footer>
    </div>
  );
}


export default App;