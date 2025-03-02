import './App.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import { useEffect, useRef, useState, createContext, useContext, useCallback } from 'react'

axios.defaults.withCredentials = true

// const serverUrl = process.env.REACT_APP_SERVER_URL
const serverUrl = 'http://localhost:5000'

const AuthContext = createContext()

export function Profile() {
    const { user, loggedIn, checkLoginState } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  useEffect(() => {
    ;(async () => {
      if (loggedIn === true) {
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

  console.log("test2")

  return(
    <>
    <div style="background-color:red">
      <h2>{user?.name}</h2>
      <br/>
      <h3>{user?.email}</h3>
      <br/>
      <button className="btn" onClick={handleLogout}>
         Logout
       </button>
       </div>
    </>
  )
}

export default Profile