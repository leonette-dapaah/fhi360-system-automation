import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InitialPage from "./components/main_page/index";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<InitialPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
