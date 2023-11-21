import React from 'react'
import NavBar from './components/Nav/Nav'
import TopBanner from './components/TopBanner/TopBanner'
import Login from './components/Login/Login'
import LogInPage from './Pages/Login/Login'
import SignUp from './components/SignUp/SignUp'
import SignUpPage from './Pages/SignUp/SignUp'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Cart from './components/Cart/Cart'
import Shop from './components/Shop/Shop'
import Checkout from './components/CheckOut/Checkout'
function App() {
  return (
      <>
    <Router>
      <Routes>
        <Route path='/test' element= {<SignUp />} ></Route>
        <Route path='/' element= { <> <TopBanner />  <NavBar /> <Shop /> <Cart />  </>} ></Route>
        <Route path='/login' element= {<LogInPage />} ></Route>
        <Route path='/signup' element= {<SignUpPage />} ></Route>
        <Route path='/checkout' element= {<Checkout />} ></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App