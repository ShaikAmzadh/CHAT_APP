import Login from "./pages/login/Login";
import SignUp from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <SignUp />}
        />
      </Routes>
    </div>
  );
}

export default App;
