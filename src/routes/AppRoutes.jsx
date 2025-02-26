import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Packages from "../pages/Packages";
import Forget from "../pages/ForgetPassword";
import Reset from "../pages/PasswordReset";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/forget-password" element={<Forget />} Route />
            <Route path="/passwod-reset" element={<Reset />} Route />
        </Routes>
    );
};

export default AppRoutes;
