import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, NavLink } from 'react-router-dom'
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import DailyWeather from './components/DailyWeather';
import ActivityList from './components/ActivityList';
import ActivityMonitor from './components/ActivityMonitor';
// import InitialSetup from './components/InitialSetup'

function App() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('loggedIn'))
  const [signedUp, setSignedUp] = useState()
  const [name, setName] = useState(sessionStorage.getItem("name"))
  const [email, setEmail] = useState(sessionStorage.getItem("email"))

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* "element" prop needs to be declared in route tags that 
            need multiple components */}
          <Route path="" element={<Navigate to="/login"></Navigate>} />

          <Route path="/login" element={
            loggedIn === "true" ?
              <Navigate to="/home"></Navigate>
              :
              <div>
                <Login setName={setName} setLoggedIn={setLoggedIn} setEmail={setEmail}></Login>
                <div className="signUpLink">
                  <p>Don't have an account?</p>
                  <NavLink to="/signUp">Sign Up</NavLink>
                </div>
              </div>
          }></Route>

          <Route path="/home" element={
            <div class="container">
              <Navbar name={name} email={email}></Navbar>

              {/* <InitialSetup /> */}

              <h1>Granola Trails</h1>
              <div class="row">
              </div>
              <div class="row">
                <ActivityList />
              </div>
            </div>
          }></Route>

          <Route path="/signUp" element={
            signedUp === true ?
              <Navigate to="/login"></Navigate>
              :
              <div>
                <Signup setSignedUp={setSignedUp}></Signup>
                <div className="loginLink">
                  <p>Already have an account?</p>
                  <NavLink to="/login">Login</NavLink>
                </div>
              </div>
          }></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
