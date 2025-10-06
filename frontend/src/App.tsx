import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import AuthProvide from "./context/Auth/AuthProvider";

function App() {
  return (
    <AuthProvide>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/register" element={<RegisterPage/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvide>
  );
}

export default App;
