import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import StatisticsPanel from "./StatisticsPanel";
import UserActivityTable from "./UserActivityTable";
import ConversationFeedbackPanel from "./ConversationFeedbackPanel";
import LoginPage from "../auth/LoginPage";

interface DashboardLayoutProps {
  isAuthenticated?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

const DashboardLayout = ({
  isAuthenticated = false,
  onLogin = () => console.log("Login clicked"),
  onLogout = () => console.log("Logout clicked"),
}: DashboardLayoutProps) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userConversations, setUserConversations] = useState<any[]>([]);
  const [activeStatFilter, setActiveStatFilter] = useState<string | null>(null);

  // Sample conversation data mapped to user IDs
  const userConversationMap = {
    "1": [
      {
        id: "1-1",
        user: {
          name: "John Doe",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        },
        timestamp: "2023-06-15T14:30:00Z",
        messages: [
          {
            id: "m1",
            content: "How do I access the analytics dashboard?",
            sender: "user",
            timestamp: "2023-06-15T14:30:00Z",
          },
          {
            id: "m2",
            content:
              "You can access the analytics dashboard by clicking on the 'Analytics' tab in the main navigation menu.",
            sender: "ai",
            timestamp: "2023-06-15T14:31:00Z",
          },
          {
            id: "m3",
            content: "Perfect, thank you!",
            sender: "user",
            timestamp: "2023-06-15T14:32:00Z",
          },
        ],
        sentiment: "positive",
      },
      {
        id: "1-2",
        user: {
          name: "John Doe",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        },
        timestamp: "2023-06-14T10:15:00Z",
        messages: [
          {
            id: "m1",
            content: "Is there a way to export my data?",
            sender: "user",
            timestamp: "2023-06-14T10:15:00Z",
          },
          {
            id: "m2",
            content:
              "Yes, you can export your data in CSV or JSON format from the settings page.",
            sender: "ai",
            timestamp: "2023-06-14T10:16:00Z",
          },
          {
            id: "m3",
            content: "Thanks for the quick response.",
            sender: "user",
            timestamp: "2023-06-14T10:17:00Z",
          },
        ],
        sentiment: "positive",
      },
    ],
    "2": [
      {
        id: "2-1",
        user: {
          name: "Jane Smith",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
        },
        timestamp: "2023-06-14T09:15:00Z",
        messages: [
          {
            id: "m1",
            content:
              "The dashboard is not loading correctly on my mobile device.",
            sender: "user",
            timestamp: "2023-06-14T09:15:00Z",
          },
          {
            id: "m2",
            content:
              "I'm sorry to hear that. Could you please tell me which mobile device and browser you're using?",
            sender: "ai",
            timestamp: "2023-06-14T09:16:00Z",
          },
          {
            id: "m3",
            content: "I'm using an iPhone 12 with Safari.",
            sender: "user",
            timestamp: "2023-06-14T09:17:00Z",
          },
          {
            id: "m4",
            content:
              "Thank you for that information. We're aware of some compatibility issues with Safari. Could you try using Chrome instead?",
            sender: "ai",
            timestamp: "2023-06-14T09:18:00Z",
          },
          {
            id: "m5",
            content: "That didn't work either. This is frustrating.",
            sender: "user",
            timestamp: "2023-06-14T09:20:00Z",
          },
        ],
        sentiment: "negative",
      },
    ],
    "3": [
      {
        id: "3-1",
        user: {
          name: "Robert Johnson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
        },
        timestamp: "2023-06-10T16:20:00Z",
        messages: [
          {
            id: "m1",
            content: "How often is the data updated?",
            sender: "user",
            timestamp: "2023-06-10T16:20:00Z",
          },
          {
            id: "m2",
            content:
              "The data is updated in real-time for active users and conversations. Historical data is aggregated every hour.",
            sender: "ai",
            timestamp: "2023-06-10T16:21:00Z",
          },
          {
            id: "m3",
            content: "I see. Thanks for the information.",
            sender: "user",
            timestamp: "2023-06-10T16:22:00Z",
          },
        ],
        sentiment: "neutral",
      },
    ],
    "4": [
      {
        id: "4-1",
        user: {
          name: "Emily Wilson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        },
        timestamp: "2023-06-15T11:05:00Z",
        messages: [
          {
            id: "m1",
            content: "Can I customize which metrics are shown on my dashboard?",
            sender: "user",
            timestamp: "2023-06-15T11:05:00Z",
          },
          {
            id: "m2",
            content:
              "Yes, you can customize your dashboard by clicking the 'Customize' button in the top right corner. From there, you can add, remove, or rearrange widgets.",
            sender: "ai",
            timestamp: "2023-06-15T11:06:00Z",
          },
          {
            id: "m3",
            content: "Perfect! That's exactly what I needed.",
            sender: "user",
            timestamp: "2023-06-15T11:07:00Z",
          },
        ],
        sentiment: "positive",
      },
      {
        id: "4-2",
        user: {
          name: "Emily Wilson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        },
        timestamp: "2023-06-14T15:30:00Z",
        messages: [
          {
            id: "m1",
            content: "Is there a way to set up alerts for specific metrics?",
            sender: "user",
            timestamp: "2023-06-14T15:30:00Z",
          },
          {
            id: "m2",
            content:
              "Yes, you can set up alerts by going to Settings > Notifications > Metric Alerts. There you can define thresholds for any metric.",
            sender: "ai",
            timestamp: "2023-06-14T15:31:00Z",
          },
          {
            id: "m3",
            content: "Great, thank you!",
            sender: "user",
            timestamp: "2023-06-14T15:32:00Z",
          },
        ],
        sentiment: "positive",
      },
    ],
    "5": [
      {
        id: "5-1",
        user: {
          name: "Michael Brown",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        },
        timestamp: "2023-06-15T08:45:00Z",
        messages: [
          {
            id: "m1",
            content:
              "I just signed up. How do I get started with the platform?",
            sender: "user",
            timestamp: "2023-06-15T08:45:00Z",
          },
          {
            id: "m2",
            content:
              "Welcome to the platform! I recommend starting with our interactive tutorial which will guide you through the main features. You can access it by clicking the 'Tutorial' button in the help menu.",
            sender: "ai",
            timestamp: "2023-06-15T08:46:00Z",
          },
          {
            id: "m3",
            content: "Thanks, I'll check that out.",
            sender: "user",
            timestamp: "2023-06-15T08:47:00Z",
          },
        ],
        sentiment: "neutral",
      },
    ],
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <LoginPage onLogin={onLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader onLogout={onLogout} />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content area */}
          <div className="flex-1 space-y-6">
            <StatisticsPanel
              onFilterChange={setActiveStatFilter}
              activeFilter={activeStatFilter}
            />

            <UserActivityTable
              activeStatFilter={activeStatFilter}
              onSort={(column, direction) => {
                console.log(`Sorting by ${column} in ${direction} order`);
              }}
              onFilter={(filters) => {
                console.log("Applying filters:", filters);
              }}
              onExport={() => {
                console.log("Exporting data");
              }}
              onUserSelect={(userId) => {
                setSelectedUser(userId);
                // Load conversations for the selected user
                // Check if there are direct conversations for this user ID
                let conversations = userConversationMap[userId] || [];

                // If no conversations found, try to find conversations by matching user ID in conversation ID
                if (conversations.length === 0) {
                  // Look through all conversations to find any that might match this user
                  Object.values(userConversationMap).forEach((convGroup) => {
                    convGroup.forEach((conv) => {
                      if (
                        conv.id.includes(userId) ||
                        (conv.user &&
                          conv.user.name &&
                          conv.user.name
                            .toLowerCase()
                            .includes(userId.toLowerCase()))
                      ) {
                        conversations.push(conv);
                      }
                    });
                  });
                }

                setUserConversations(conversations);
              }}
            />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[450px]">
            <ConversationFeedbackPanel
              conversations={userConversations}
              onSelectConversation={(conversation) => {
                console.log("Selected conversation:", conversation);
              }}
              selectedUserId={selectedUser}
            />
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AI Agent Analytics Dashboard</p>
          <p className="mt-1">
            Last data refresh: {new Date().toLocaleString()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
