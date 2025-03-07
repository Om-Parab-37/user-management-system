import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/LoginPageComponents/ProtectedRoute";
import HomePage from "./pages/HomePage";
import { UserRole } from "./lib/types/authTypes";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to={"/login"} />} />

          <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
          <Route
            element={
              <ProtectedRoute allowedRoles={[UserRole.USER, UserRole.ADMIN]} />
            }
          >
            <Route path="/home-page" element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
