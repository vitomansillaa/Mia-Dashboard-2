import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Search,
  SortAsc,
  SortDesc,
  Star,
} from "lucide-react";

interface UserActivity {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  messageCount: number;
  weeklyChange: number;
  isFavorite?: boolean;
  activeWeeks?: number;
}

interface UserActivityTableProps {
  activities?: UserActivity[];
  onSort?: (column: string, direction: "asc" | "desc") => void;
  onFilter?: (filters: Record<string, string>) => void;
  onUserSelect?: (userId: string) => void;
  onToggleFavorite?: (userId: string, isFavorite: boolean) => void;
  activeStatFilter?: string | null;
}

const UserActivityTable = ({
  activities = [
    {
      id: "1",
      username: "john_doe",
      email: "john.doe@example.com",
      createdAt: "2023-05-15T14:30:00",
      messageCount: 42,
      weeklyChange: 12.5,
      activeWeeks: 3,
    },
    {
      id: "2",
      username: "jane_smith",
      email: "jane.smith@example.com",
      createdAt: "2023-05-14T09:15:00",
      messageCount: 28,
      weeklyChange: 8.2,
      activeWeeks: 2,
    },
    {
      id: "3",
      username: "robert_johnson",
      email: "robert.j@example.com",
      createdAt: "2023-05-10T16:20:00",
      messageCount: 15,
      weeklyChange: -3.1,
      activeWeeks: 1,
    },
    {
      id: "4",
      username: "emily_wilson",
      email: "emily.w@example.com",
      createdAt: "2023-05-15T11:05:00",
      messageCount: 37,
      weeklyChange: 5.7,
      activeWeeks: 3,
    },
    {
      id: "5",
      username: "michael_brown",
      email: "michael.b@example.com",
      createdAt: "2023-05-15T08:45:00",
      messageCount: 8,
      weeklyChange: -2.3,
      activeWeeks: 1,
    },
    {
      id: "6",
      username: "sarah_davis",
      email: "sarah.d@example.com",
      createdAt: "2023-05-12T13:20:00",
      messageCount: 23,
      weeklyChange: 4.1,
    },
    {
      id: "7",
      username: "david_miller",
      email: "david.m@example.com",
      createdAt: "2023-05-11T10:15:00",
      messageCount: 19,
      weeklyChange: 1.8,
    },
    {
      id: "8",
      username: "lisa_wilson",
      email: "lisa.w@example.com",
      createdAt: "2023-05-09T14:45:00",
      messageCount: 31,
      weeklyChange: 6.2,
    },
    {
      id: "9",
      username: "james_taylor",
      email: "james.t@example.com",
      createdAt: "2023-05-08T09:30:00",
      messageCount: 27,
      weeklyChange: -1.5,
    },
    {
      id: "10",
      username: "jennifer_clark",
      email: "jennifer.c@example.com",
      createdAt: "2023-05-07T16:10:00",
      messageCount: 34,
      weeklyChange: 7.3,
    },
    {
      id: "11",
      username: "thomas_white",
      email: "thomas.w@example.com",
      createdAt: "2023-05-06T11:25:00",
      messageCount: 16,
      weeklyChange: -4.2,
    },
    {
      id: "12",
      username: "amanda_harris",
      email: "amanda.h@example.com",
      createdAt: "2023-05-05T15:40:00",
      messageCount: 22,
      weeklyChange: 3.9,
    },
    {
      id: "13",
      username: "kevin_martin",
      email: "kevin.m@example.com",
      createdAt: "2023-05-04T10:05:00",
      messageCount: 29,
      weeklyChange: 5.1,
    },
    {
      id: "14",
      username: "laura_thompson",
      email: "laura.t@example.com",
      createdAt: "2023-05-03T14:20:00",
      messageCount: 18,
      weeklyChange: -2.7,
    },
    {
      id: "15",
      username: "daniel_anderson",
      email: "daniel.a@example.com",
      createdAt: "2023-05-02T09:15:00",
      messageCount: 25,
      weeklyChange: 4.5,
    },
    {
      id: "16",
      username: "michelle_jackson",
      email: "michelle.j@example.com",
      createdAt: "2023-05-01T13:30:00",
      messageCount: 33,
      weeklyChange: 6.8,
    },
    {
      id: "17",
      username: "christopher_lee",
      email: "christopher.l@example.com",
      createdAt: "2023-04-30T10:45:00",
      messageCount: 21,
      weeklyChange: 2.3,
    },
    {
      id: "18",
      username: "jessica_walker",
      email: "jessica.w@example.com",
      createdAt: "2023-04-29T15:10:00",
      messageCount: 26,
      weeklyChange: -1.9,
    },
    {
      id: "19",
      username: "matthew_hall",
      email: "matthew.h@example.com",
      createdAt: "2023-04-28T11:35:00",
      messageCount: 30,
      weeklyChange: 5.4,
    },
    {
      id: "20",
      username: "olivia_young",
      email: "olivia.y@example.com",
      createdAt: "2023-04-27T14:50:00",
      messageCount: 24,
      weeklyChange: 3.2,
    },
  ],
  onSort = () => {},
  onFilter = () => {},
  onUserSelect = () => {},
  onToggleFavorite = () => {},
  activeStatFilter = null,
}: UserActivityTableProps) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteUsers, setFavoriteUsers] = useState<Record<string, boolean>>(
    {},
  );
  const usersPerPage = 10;

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      const newDirection = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(newDirection);
      onSort(column, newDirection);
    } else {
      // New column, default to ascending
      setSortColumn(column);
      setSortDirection("asc");
      onSort(column, "asc");
    }
  };

  // Sort by favorite status
  const handleSortByFavorite = () => {
    if (sortColumn === "favorite") {
      // Toggle direction if already sorting by favorite
      const newDirection = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(newDirection);
      onSort("favorite", newDirection);
    } else {
      // New column, default to descending (favorites first)
      setSortColumn("favorite");
      setSortDirection("desc");
      onSort("favorite", "desc");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
    onFilter({ search: e.target.value });
  };

  const handleToggleFavorite = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click event
    const newValue = !favoriteUsers[userId];
    setFavoriteUsers((prev) => ({
      ...prev,
      [userId]: newValue,
    }));
    onToggleFavorite(userId, newValue);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Apply statistics filter first
  const statFilteredActivities = activities.filter((activity) => {
    if (!activeStatFilter) return true;

    // Default to 0 if activeWeeks is not defined
    const activeWeeks = activity.activeWeeks || 0;

    switch (activeStatFilter) {
      case "all":
        return true;
      case "week1":
        return activeWeeks >= 1;
      case "week2":
        return activeWeeks >= 2;
      case "week3":
        return activeWeeks >= 3;
      default:
        return true;
    }
  });

  // Then filter by search term
  const filteredActivities = statFilteredActivities.filter(
    (activity) =>
      activity.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Sort by favorite if that's the selected column
  const sortedActivities = [...filteredActivities];
  if (sortColumn === "favorite") {
    sortedActivities.sort((a, b) => {
      const aFavorite = favoriteUsers[a.id] || false;
      const bFavorite = favoriteUsers[b.id] || false;

      if (sortDirection === "desc") {
        // Favorites first
        return aFavorite === bFavorite ? 0 : aFavorite ? -1 : 1;
      } else {
        // Non-favorites first
        return aFavorite === bFavorite ? 0 : aFavorite ? 1 : -1;
      }
    });
  }

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = (
    sortColumn === "favorite" ? sortedActivities : filteredActivities
  ).slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredActivities.length / usersPerPage);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-3 flex justify-between items-center gap-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">User Activity</h3>
          {activeStatFilter && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {activeStatFilter === "all"
                ? "All Users"
                : activeStatFilter === "week1"
                  ? "Active (1st Week)"
                  : activeStatFilter === "week2"
                    ? "Active (2 Weeks)"
                    : activeStatFilter === "week3"
                      ? "Active (3 Weeks)"
                      : ""}
            </span>
          )}
        </div>

        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-3 w-3 text-gray-500" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-7 h-8 text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-10 text-center cursor-pointer hover:bg-gray-50"
                onClick={handleSortByFavorite}
              >
                <div className="flex items-center justify-center gap-1 text-xs">
                  Favorite
                  {sortColumn === "favorite" &&
                    (sortDirection === "asc" ? (
                      <SortAsc className="h-3 w-3" />
                    ) : (
                      <SortDesc className="h-3 w-3" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50 w-1/3"
                onClick={() => handleSort("username")}
              >
                <div className="flex items-center gap-1 text-xs">
                  User
                  {sortColumn === "username" &&
                    (sortDirection === "asc" ? (
                      <SortAsc className="h-3 w-3" />
                    ) : (
                      <SortDesc className="h-3 w-3" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort("createdAt")}
              >
                <div className="flex items-center gap-1 text-xs">
                  Created
                  {sortColumn === "createdAt" &&
                    (sortDirection === "asc" ? (
                      <SortAsc className="h-3 w-3" />
                    ) : (
                      <SortDesc className="h-3 w-3" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort("messageCount")}
              >
                <div className="flex items-center gap-1 text-xs">
                  Messages
                  {sortColumn === "messageCount" &&
                    (sortDirection === "asc" ? (
                      <SortAsc className="h-3 w-3" />
                    ) : (
                      <SortDesc className="h-3 w-3" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort("weeklyChange")}
              >
                <div className="flex items-center gap-1 text-xs">
                  Weekly Change
                  {sortColumn === "weeklyChange" &&
                    (sortDirection === "asc" ? (
                      <SortAsc className="h-3 w-3" />
                    ) : (
                      <SortDesc className="h-3 w-3" />
                    ))}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No user activity data available
                </TableCell>
              </TableRow>
            ) : (
              currentUsers.map((activity) => (
                <TableRow
                  key={activity.id}
                  className="cursor-pointer hover:bg-gray-50 text-sm"
                  onClick={() => onUserSelect(activity.id)}
                >
                  <TableCell className="text-center">
                    <button
                      onClick={(e) => handleToggleFavorite(activity.id, e)}
                      className="focus:outline-none"
                    >
                      {favoriteUsers[activity.id] ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#FFD700"
                          stroke="#FFD700"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      )}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">
                        {activity.username}
                      </span>
                      <span className="text-xs text-gray-500">
                        {activity.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(activity.createdAt)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {activity.messageCount}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {activity.weeklyChange > 0 ? (
                        <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-sm ${activity.weeklyChange > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {Math.abs(activity.weeklyChange).toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="p-3 border-t border-gray-200 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          Showing {indexOfFirstUser + 1}-
          {Math.min(indexOfLastUser, filteredActivities.length)} of{" "}
          {filteredActivities.length} users
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserActivityTable;
