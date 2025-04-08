import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./routes/ProtectedRoutes";




function App() {

  return (
    <Router>

      <AppRoutes />
      <ProtectedRoute />
      <ToastContainer />

    </Router>
  );
}

export default App;
