import React from "react";
import { Card, CardContent } from "../ui/card";
import { ArrowDown, ArrowUp, Users, Clock, Calendar, X } from "lucide-react";

interface StatisticCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  filterType?: string;
  onClick?: (filterType: string) => void;
  isActive?: boolean;
}

const StatisticCard = ({
  title = "Statistic",
  value = "0",
  change = 0,
  icon = <Users className="h-3 w-3 text-muted-foreground" />,
  filterType,
  onClick,
  isActive = false,
}: StatisticCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card
      className={`bg-white p-2 ${onClick ? "cursor-pointer hover:bg-gray-50 transition-colors" : ""} ${isActive ? "ring-2 ring-primary" : ""}`}
      onClick={() => filterType && onClick && onClick(filterType)}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium">{title}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm font-bold">{value}</span>
        <span
          className={`flex items-center text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}
        >
          {isPositive ? (
            <ArrowUp className="h-2 w-2" />
          ) : (
            <ArrowDown className="h-2 w-2" />
          )}
          {Math.abs(change)}%
        </span>
      </div>
    </Card>
  );
};

interface StatisticsPanelProps {
  totalUsers?: number;
  firstWeekUsers?: number;
  twoWeekUsers?: number;
  threeWeekUsers?: number;
  totalUsersChange?: number;
  firstWeekUsersChange?: number;
  twoWeekUsersChange?: number;
  threeWeekUsersChange?: number;
  onFilterChange?: (filterType: string | null) => void;
  activeFilter?: string | null;
}

const StatisticsPanel = ({
  totalUsers = 12458,
  firstWeekUsers = 3842,
  twoWeekUsers = 5621,
  threeWeekUsers = 7890,
  totalUsersChange = 12.5,
  firstWeekUsersChange = 8.2,
  twoWeekUsersChange = -3.1,
  threeWeekUsersChange = 5.7,
  onFilterChange = () => {},
  activeFilter = null,
}: StatisticsPanelProps) => {
  const handleFilterClick = (filterType: string) => {
    // If the same filter is clicked again, clear the filter
    if (activeFilter === filterType) {
      onFilterChange(null);
    } else {
      onFilterChange(filterType);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg p-2 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">User Statistics</h3>
        {activeFilter && (
          <button
            onClick={() => onFilterChange(null)}
            className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            Clear filter <X className="h-3 w-3" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        <StatisticCard
          title="Total Users"
          value={totalUsers.toLocaleString()}
          change={totalUsersChange}
          icon={<Users className="h-3 w-3" />}
          filterType="all"
          onClick={handleFilterClick}
          isActive={activeFilter === "all"}
        />

        <StatisticCard
          title="Active (1st Week)"
          value={firstWeekUsers.toLocaleString()}
          change={firstWeekUsersChange}
          icon={<Clock className="h-3 w-3" />}
          filterType="week1"
          onClick={handleFilterClick}
          isActive={activeFilter === "week1"}
        />

        <StatisticCard
          title="Active (2 Weeks)"
          value={twoWeekUsers.toLocaleString()}
          change={twoWeekUsersChange}
          icon={<Calendar className="h-3 w-3" />}
          filterType="week2"
          onClick={handleFilterClick}
          isActive={activeFilter === "week2"}
        />

        <StatisticCard
          title="Active (3 Weeks)"
          value={threeWeekUsers.toLocaleString()}
          change={threeWeekUsersChange}
          icon={<Calendar className="h-3 w-3" />}
          filterType="week3"
          onClick={handleFilterClick}
          isActive={activeFilter === "week3"}
        />
      </div>
    </div>
  );
};

export default StatisticsPanel;
