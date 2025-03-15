import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import About from "./pages/about";
import Nav from "./Nav";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <footer className="flex w-full justify-between px-[65px] p-2 max-md:hidden">
        <p>Copyright © 2025 Liveness Detection </p>
        <p>
          Computer Science, King Mongkut's Institute of Technology Ladkrabang
        </p>
      </footer>
    </Router>
  );
};

export default AppRoutes;
