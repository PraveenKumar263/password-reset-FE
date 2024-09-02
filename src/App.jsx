import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignUp from './components/Signup'
import Login from './components/Login'

function App() {

  return (
      <>
        <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </>
  )
}

export default App
