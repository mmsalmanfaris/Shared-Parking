import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import ProtectedRoute from "./routes/ProtectedRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {

  return (
    <Router>

      <Routes>
        {AppRoutes()}
        {ProtectedRoute()}
      </Routes>

      <ToastContainer />

    </Router>
  );
}

export default App;
