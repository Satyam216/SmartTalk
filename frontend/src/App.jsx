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
      {/* Navbar only when logged in */}
      {authUser && <Navbar />}

      <Routes>

        {/* Default route always redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login */}
        <Route
          path="/login"
          element={
            !authUser ? <LoginPage /> : <Navigate to="/home" />
          }
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={
            !authUser ? <SignUpPage /> : <Navigate to="/home" />
          }
        />

        {/* Home (Protected) */}
        <Route
          path="/home"
          element={
            authUser ? <HomePage /> : <Navigate to="/login" />
          }
        />

        {/* Profile (Protected) */}
        <Route
          path="/profile"
          element={
            authUser ? <ProfilePage /> : <Navigate to="/login" />
          }
        />

        {/* Settings (Protected) */}
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
