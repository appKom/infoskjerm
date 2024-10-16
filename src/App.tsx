import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage } from './components/pages/MainPage';
import { AppRedirect } from './components/pages/AppRedirect';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/online-appen" element={<AppRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
