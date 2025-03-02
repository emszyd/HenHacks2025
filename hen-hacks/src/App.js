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

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null)
  const [user, setUser] = useState(null)

  const checkLoginState = useCallback(async () => {
    try {
      const {
        data: { loggedIn: logged_in, user },
      } = await axios.get(`${serverUrl}/auth/logged_in`)
      setLoggedIn(logged_in)
      user && setUser(user)
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    checkLoginState()
  }, [checkLoginState])

  return (
    <AuthContext.Provider value={{ loggedIn, checkLoginState, user }}>
      {children}
    </AuthContext.Provider>
  )
}



const Profile = () => {
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
    <div styles="background-color:red">
      <h2>{user?.name}</h2>
      <h3>{user?.email}</h3>
      <button className="btn" onClick={handleLogout}>
         Logout
       </button>
       <a href="/">
      <button >
        Home
      </button>
        </a>
       </div>
    </>
  )


}



const Dashboard = () => {
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

    const [showInput, setShowInput] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [itemCount, setItemCount] = useState('');
    const [category, setCategory] = useState('');
    const [items, setItems] = useState({
      Food: [],
      Clothing: [],
      Games: [],
      Bathroom_Products: [],
      Building_Supplies: [],
    });
  
    const handleClickFood = () => {
      setCategory('Food')
      setShowInput(true);
    };
  
    const handleClickClothing = () => {
      setCategory('Clothing')
      setShowInput(true);
    };
  
    const handleClickGames = () => {
      setCategory('Games')
      setShowInput(true);
    };
  
  
    const handleClickBathroomProducts = () => {
      setCategory('Bathroom_Products')
      setShowInput(true);
    };
  
    const handleClickBuildingSupplies = () => {
      setCategory('Building_Supplies')
      setShowInput(true);
    };
  
    const handleChange = (e) => {
      setUserInput(e.target.value);
    };
  
    const handleItemCountChange = (e) => {
      setItemCount(e.target.value);
    }
   
    const handleSubmit = (e) => {
      e.preventDefault();
  
      /* state setter function - takes a callback function as an argument. 
        callback receives previous state (prevItems - current list before update)*/
      setItems((prevItems) => ({
        ...prevItems, //spread operator: shallow copy so that the state is not mutated directly. all categories and their items ate kept intact when updated. 
        [category]: [
          ...prevItems[category],
          {name: userInput, count: itemCount },
        ],
      }))
      setShowInput(false);
      setUserInput('');
      setItemCount('');
    };

    const [showProfile, setShowProfile] = useState(false);
    const handleProfile = () => {
      console.log("clck")
      return (<BrowserRouter>
      <Routes>
      <Route>
                <Route path='/' element={<Profile />}/>
              </Route>
              </Routes>
              </BrowserRouter>)
    }

  return (
    <div className = "container">
    <div className = "title"> Emergency Pals </div>
    <div className='button-container'>
    <button onClick={handleClickFood}>Food</button>
    <button onClick={handleClickClothing}>Clothing</button>
      <button onClick={handleClickGames}>Games</button>
      <button onClick={handleClickBathroomProducts}>Bathroom Products</button>
      <button onClick={handleClickBuildingSupplies}>Building Supplies</button>
    </div>
    {showInput && (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          placeholder={`Enter Your ${category}`} />
          <input
            type="text"
            value={itemCount}
            onChange={handleItemCountChange}
            placeholder={`How many do you have?`} />
          <button type="submit">Submit</button>
      </form>
      )}

      {/*this should display the list items... crossing fingers */}
      {category && (
        <div>
          <h3>{category} </h3>
          <ul>
            {items[category].map((item, index) => (
              <li key={index}>
                {item.name} - {item.count} - {user?.name}
              </li>
            ))}
          </ul>
          </div>
      )}
      <a href="/profile">
      <button >
        Profile
      </button>
        </a>
    {/* <BrowserRouter>
    <Routes>
      <Route>
      <Route path="/" element={<Profile />} />
      </Route>
    </Routes>
    </BrowserRouter> */}
    </div>
    
    // <>
    //   <h3>Dashboard</h3>
    //   <button className="btn" onClick={handleLogout}>
    //     Logout
    //   </button>
    //   <h4>{user?.name}</h4>
    //   <br />
    //   <p>{user?.email}</p>
    //   <br />
    //   <img src={user?.picture} alt={user?.name} />
    //   <br />
    //   <div>
    //     {posts.map((post, idx) => (
    //       <div>
    //         <h5>{post?.title}</h5>
    //         <p>{post?.body}</p>
    //       </div>
    //     ))}
    //   </div>
    // </>
  )
}

const Login = () => {
  const handleLogin = async () => {
    try {
      // Gets authentication url from backend server
      const {
        data: { url },
      } = await axios.get(`${serverUrl}/auth/url`)
      // Navigate to consent screen
      window.location.assign(url)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <h3>Login to Dashboard</h3>
      <button className="btn" onClick={handleLogin}>
        Login
      </button>
    </>
  )
}

const Callback = () => {
  const called = useRef(false)
  const { checkLoginState, loggedIn } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    ;(async () => {
      if (loggedIn === false) {
        try {
          if (called.current) return // prevent rerender caused by StrictMode
          called.current = true
          const res = await axios.get(`${serverUrl}/auth/token${window.location.search}`)
          console.log('response: ', res)
          checkLoginState()
          navigate('/')
        } catch (err) {
          console.error(err)
          navigate('/')
        }
      } else if (loggedIn === true) {
        navigate('/')
      }
    })()
  }, [checkLoginState, loggedIn, navigate])
  return <></>
}

const Home = () => {
  const { loggedIn } = useContext(AuthContext)
  if (loggedIn === true) return <Dashboard />
  if (loggedIn === false) return <Login />
  return <></>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth/callback', // google will redirect here
    element: <Callback />,
  },
  {
    path: '/profile',
    element: <Profile />
  }

])


export function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={ logo } className="App-logo" alt="logo" /> */}
        {/* <button>HI</button> */}
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </header>
    </div>
  );
}

export default App;