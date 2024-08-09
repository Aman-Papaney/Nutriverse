import { Routes, Route, BrowserRouter } from "react-router-dom"
import { useState } from "react"

import './App.css'
import { UserProvider } from "./contexts/User"
import Register from "./components/Register"
import Login from "./components/Login"
import Track from "./components/Track"
import Private from "./components/Private"
import NotFound from "./components/NotFound"
import Stats from "./components/Stats"
import Home from "./components/Home"
import Header from "./components/Header"
import Contact from "./components/Contact"

function App() {

  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('nutrify-user')))

  return (

    <UserProvider value={{ loggedUser, setLoggedUser }}>
     

      <BrowserRouter>
        <Header />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/track" element={<Private Component={Track} />} />
          <Route path="/stats" element={<Private Component={Stats} />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
        
      </BrowserRouter>

    </UserProvider>

  )
}

export default App
