import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./config/useAuth";
import { useTheme } from "./config/useTheme";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 🔄 Show loader while checking auth
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>

      {authUser && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            !authUser ? <LoginPage /> : <Navigate to="/home" />
          }
        />
        <Route
          path="/signup"
          element={
            !authUser ? <SignUpPage /> : <Navigate to="/home" />
          }
        />
        <Route
          path="/home"
          element={
            authUser ? <HomePage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile"
          element={
            authUser ? <ProfilePage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/settings"
          element={
            authUser ? <SettingsPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
