import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import InventoryManagement from "./pages/InventoryManagement"

function App() {
  const isAuthenticated = true

  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={isAuthenticated ? <Dashboard userRole={'admin'} /> : <Login/>}>
            <Route path="inventory-management" element={<InventoryManagement />} />
          </Route>
        </Routes>
    </Router>
  )
}

export default App
