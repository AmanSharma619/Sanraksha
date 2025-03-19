import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Heatmaps from './components/Heatmaps';
import Components from './Components.jsx';
import Safezones from './components/Safezones';
import RecentCrimes from './components/RecentCrimes';
import Feedback from './components/Feedback';
import Precautionary from './components/Precautionary';
import SecureDashboard from './utils/SecureDashboard';
import Kavach from './components/Kavach';

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
          <Route path="/precautionary_measures" element={< Precautionary/>} />
          <Route path="/kavach" element={< Kavach/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
