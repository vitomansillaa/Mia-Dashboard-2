import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

interface DashboardHeaderProps {
  onLogout?: () => void;
}

const DashboardHeader = ({
  onLogout = () => console.log("Logout clicked"),
}: DashboardHeaderProps) => {
  return (
    <header className="w-full h-12 bg-white border-b border-gray-200 px-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        <h1 className="text-sm font-medium text-gray-700">Analytics</h1>
      </div>

      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 flex items-center gap-1"
          onClick={onLogout}
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="text-xs">Log out</span>
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
