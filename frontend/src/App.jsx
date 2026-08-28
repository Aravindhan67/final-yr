import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import Home      from './pages/Home/Home';
import Upload    from './pages/Upload/Upload';
import Result    from './pages/Result/Result';
import Dashboard from './pages/Dashboard/Dashboard';
import About     from './pages/About/About';
import Contact   from './pages/Contact/Contact';
import FAQ       from './pages/FAQ/FAQ';
import DeviceMonitor from './pages/DeviceMonitor/DeviceMonitor';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index        element={<Home />} />
            <Route path="upload"    element={<Upload />} />
            <Route path="result"    element={<Result />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="device-monitor" element={<DeviceMonitor />} />
            <Route path="about"     element={<About />} />
            <Route path="contact"   element={<Contact />} />
            <Route path="faq"       element={<FAQ />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
