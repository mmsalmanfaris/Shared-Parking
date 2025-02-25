import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Packages from "../pages/Packages";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/packages" element={<Packages />} />
        </Routes>
    );
};

export default AppRoutes;
