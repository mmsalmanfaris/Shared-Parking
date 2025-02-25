import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <Router>

      <AppRoutes />

    </Router>
  );
}

export default App;
