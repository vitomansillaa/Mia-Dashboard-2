import React, { useState } from "react";
import DashboardLayout from "./dashboard/DashboardLayout";

interface HomeProps {
  initialAuthenticated?: boolean;
}

const Home = ({ initialAuthenticated = false }: HomeProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthenticated);

  const handleLogin = () => {
    // In a real implementation, this would handle Google OAuth
    console.log("Logging in user");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // In a real implementation, this would clear auth tokens
    console.log("Logging out user");
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <DashboardLayout
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Home;
