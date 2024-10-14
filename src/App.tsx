import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import AdminPanel from './pages/AdminPanel/AdminPanel';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
