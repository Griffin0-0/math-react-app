import './App.css';

import Home from './Pages/Home.jsx'
import Calculate from './Pages/Calculate.jsx'

import { Routes, BrowserRouter, Route } from "react-router-dom";



function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/calculate"
                    element={<Calculate />}
                />
            </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;