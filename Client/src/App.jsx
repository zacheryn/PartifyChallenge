import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './pages/components/Header/Header';
import Home from './pages/Home';
import Collections from './pages/Collections';
import NoPage from './pages/NoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="collections" element={<Collections />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
