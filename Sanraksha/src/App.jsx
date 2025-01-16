import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Heatmaps from './components/Heatmaps';
import Components from './components/';
import Safezones from './components/Safezones';

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Components />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/heatmaps" element={<Heatmaps />} />
          <Route path="/safezones" element={<Safezones />} />
          
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
