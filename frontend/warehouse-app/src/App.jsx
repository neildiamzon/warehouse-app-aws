import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import InventoryManagement from "./pages/InventoryManagement"
import Invoices from "./pages/Invoices"
import RegistrationForm from './pages/Registration';

function App() {
  const isAuthenticated = true
  localStorage.removeItem("role");
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={isAuthenticated ? <Dashboard /> : <Login/>}>
            <Route path="inventory-management" element={<InventoryManagement />} />
            <Route path="invoices" element={<Invoices />} />
          </Route>
          <Route path="/registration" element={<RegistrationForm />} />
        </Routes>
    </Router>
  )
}

export default App
