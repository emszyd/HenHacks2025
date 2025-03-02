import './App.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useRef, useState, createContext, useContext, useCallback, use } from 'react'

import {AuthContext} from './App';

import L from 'leaflet';

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>



axios.defaults.withCredentials = true

// const serverUrl = process.env.REACT_APP_SERVER_URL
const serverUrl = 'http://localhost:5000'

const AuthContext = createContext()

export function Profile() {
    const { user, loggedIn, checkLoginState } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [userLocation, setUserLocation] = useState(null); //state for storing user loc
  
  useEffect(() => {
    ;(async () => {
      if (loggedIn === true) {

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: 39.6837, lng: 75.7497 });
          },
          (error) => {
            console.error('error fetching location: ', error);
            setUserLocation(null);
          }
        )


        try {
          // Get posts from server
          const {
            data: { posts },
          } = await axios.get(`${serverUrl}/user/posts`)
          setPosts(posts)
        } catch (err) {
          console.error(err)
        }
      }
    })()
  }, [loggedIn])

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/auth/logout`)
      // Check login state again
      checkLoginState()
    } catch (err) {
      console.error(err)
    }
  }

useEffect(() => {
  if (userLocation) {
    const map = L.map('map').setView([userLocation.lat, userLocation.lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([39.6837, 75.7497]).addTo(map)
    .bindPopup('You are here')
    .openPopup();
  }
}, [userLocation])

  console.log("test2")

  return(
    <>
    <div style="background-color:red">
      <h2>{user?.name}</h2>
      <h3>{user?.email}</h3>

      <button className="btn" onClick={handleLogout}>
         Logout
       </button>
       </div>
       <div id="map" style={{width: '50%', height: '400px', marginTop: '20px'}}></div>

    </>
  )
}

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>

export default Profile