import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Heatmaps from './components/Heatmaps';
import Components from './components/';
import Safezones from './components/Safezones';
import RecentCrimes from './components/RecentCrimes';
import Feedback from './components/Feedback';
import SecureDashboard from './utils/SecureDashboard'

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Components />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route element={<SecureDashboard />}><Route path="/dashboard" element={<Dashboard />} /></Route>
          <Route path="/heatmaps" element={<Heatmaps />} />
          <Route path="/safezones" element={<Safezones />} />
          <Route path="/recent_crimes" element={< RecentCrimes/>} />
          <Route path="/feedback" element={< Feedback/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
