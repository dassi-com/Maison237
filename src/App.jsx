import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
import OnboardingScreen from './pages/OnboardingScreen';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import AllTasksPage from "./pages/AllTasksPage"
import ParentDashboard from './pages/ParentDashboard';
import ChildDashboard from './pages/ChildDashboard';
import './App.css'

// Route protégée
// const PrivateRoute = ({ children, requiredRole }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center">
//       Chargement...
//     </div>;
//   }

//   if (!user) {
//     return <Navigate to="/signin" />;
//   }

//   if (requiredRole && user.role !== requiredRole) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

function App() {
  return (

      <Router>
        <Routes>
          <Route path="/" element={<OnboardingScreen />} />
           <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/alltask" element={<AllTasksPage  />} />
            <Route path="/ParentDashboard" element={<ParentDashboard  />} />
              <Route path="/ChildDashboard" element={<ChildDashboard />} />

          
          {/* <Route path="/parent-dashboard" element={
            <PrivateRoute requiredRole="parent">
              <ParentDashboard />
            </PrivateRoute>
          } /> */}
          
          {/* <Route path="/child-dashboard" element={
            <PrivateRoute requiredRole="child">
              <ChildDashboard />
            </PrivateRoute>
          } /> */}
        </Routes>
      </Router>
 
  );
}

export default App;