import './App.css';
import Header from './Components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Home from './Pages/Home';
import SubmitProject from './Pages/SubmitProject';
import ProjectList from './Pages/ProjectList';
function App() {



  return (
    <Router>
      {/* Router must wrap the entire app */}
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit-project" element={<SubmitProject />} />
        <Route path="/project-list" element={<ProjectList />} />

      </Routes>
    </Router>
  );
}

export default App;
