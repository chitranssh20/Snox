import React from 'react'
import NavBar from './components/Nav/Nav'
import TopBanner from './components/TopBanner/TopBanner'
import Login from './components/Login/Login'
import LogInPage from './Pages/Login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
      <>
    <Router>
      <Routes>
        <Route path='/test' element= {<Login />} ></Route>
        <Route path='/login' element= {<LogInPage />} ></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App