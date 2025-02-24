import { useState } from 'react'
import './App.css'
import MenuBar from './components/NavigationDrawer/MenuBar'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login'
import Layout from './components/Layout'

function App() {
  const [count, setCount] = useState(0)
  const isAuthenticated = true

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* If not logged in, redirect to login */}
        <Route path="/*" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
        </Route>

        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
