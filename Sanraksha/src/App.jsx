import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Components from './Components';
import Landing from './components/Landing';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Components />} >
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
