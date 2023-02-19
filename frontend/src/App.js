import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React, { Suspense, useState, useEffect } from 'react';
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PrivateRoutes from "./middleware/PrivateRoutes"
import RegisterLoginRoutes from './middleware/RegisterLoginRoutes';
import { createBrowserHistory } from "history";
import qs from "qs";


function App() {
  const history = createBrowserHistory();


  const [users, setUsers] = useState([])
  const [audios, setAudio] = useState([])
  const [id, setID] = useState('')
 
  const Home = React.lazy(() => import('./pages/Home'));
  const About = React.lazy(() => import('./pages/About'));
  const Dashboard = React.lazy(() => import('./pages/Dashboard'));
  const Register = React.lazy(() => import('./pages/Register'));
  const Login = React.lazy(() => import('./pages/Login'));
  const Account = React.lazy(() => import('./pages/Account'));


  useEffect(() => {
    const filterParams = history.location.search.substr(1);
    const filtersFromParams = qs.parse(filterParams);
    if (filtersFromParams.id) {
      setID(filtersFromParams.id);
    }
  }, []);


  const addId = (id) => {
    history.push(id)
  }

  useEffect(() => {
    addId(id)
  }, [id]);


  const addAudio = async (file) => {

    const res = await fetch('http://localhost:8000/addAudio', {
      method: 'POST',
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`,
      },
      body: JSON.stringify(file)
    })

    const data = await res.json();

    console.log(data)
    setAudio([...audios, data])

    console.log(audios)
  }


  const registerUser = async (user) => {
  
    const res = await fetch(`http://localhost:8000/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'      
      },
      body: JSON.stringify(user)
    })
  
    const data = await res.json()

    console.log(data)

    setID(data.user._id);

    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("name", data.user.name);
    localStorage.setItem("userName", data.user.userName)
    localStorage.setItem("id", data.user._id);

    setUsers([...users, data])

}


const loginUser = async (user) => {
  
  const res = await fetch(`http://localhost:8000/login`, {
  method: 'POST',
  headers: {
    'Content-type': 'application/json'      
  },
  body: JSON.stringify(user )
})

const data = await res.json()

console.log(data)

setID(data.user._id);

localStorage.setItem("token", data.token);
localStorage.setItem("email", data.user.email);
localStorage.setItem("name", data.user.name);
localStorage.setItem("userName", data.user.userName)
localStorage.setItem("id", data.user._id);
  
setUsers([...users, data])

}

  
  return (
    <Suspense fallback={<div><p>Loading...</p></div>}>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route element = {<RegisterLoginRoutes/>}>
            <Route path="/register" element={<Register onAdd = {registerUser}/>} />
            <Route path="/login" element={<Login onAdd = {loginUser} />} />
        </Route>
        <Route element={<PrivateRoutes />}>
             <Route path="/:id" element={<Home/>} />
            <Route path="/:id/about" element={<About/>} />
            <Route path="/:id/dashboard" element={<Dashboard/>} />
            <Route element = {<Account onAdd = {addAudio}/>} path = '/:id/account'/>
        </Route>
      </Routes>
    </Router>
    <ToastContainer />
    </Suspense>
  );
}


export default App;


