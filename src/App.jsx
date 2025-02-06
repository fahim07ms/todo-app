// CSS
import "./App.css";

// Components Import
import { Login } from "./components/Login";
import { Create } from "./components/Create";
import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard";

// React Modules
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return <>
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Create />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  <Toaster/>
  </>
}

export default App;