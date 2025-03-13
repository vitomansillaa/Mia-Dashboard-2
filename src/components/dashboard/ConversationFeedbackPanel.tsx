import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Search, MessageSquare, Clock, X } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface Conversation {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  messages: Message[];
}

interface ConversationFeedbackPanelProps {
  conversations?: Conversation[];
  onSelectConversation?: (conversation: Conversation) => void;
  selectedUserId?: string | null;
}

const ConversationFeedbackPanel = ({
  conversations = [
    {
      id: "1",
      user: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      timestamp: "2023-06-15T14:30:00Z",
      messages: [
        {
          id: "m1",
          content: "How do I export my data from the platform?",
          sender: "user",
          timestamp: "2023-06-15T14:30:00Z",
        },
        {
          id: "m2",
          content:
            "You can export your data by going to Settings > Data > Export. From there, you can select the format you prefer (CSV, JSON, or Excel) and download your data.",
          sender: "ai",
          timestamp: "2023-06-15T14:31:00Z",
        },
        {
          id: "m3",
          content: "Thanks, that was helpful!",
          sender: "user",
          timestamp: "2023-06-15T14:32:00Z",
        },
      ],
    },
    {
      id: "2",
      user: {
        name: "Sarah Miller",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      timestamp: "2023-06-15T13:15:00Z",
      messages: [
        {
          id: "m1",
          content: "The dashboard isn't loading properly for me.",
          sender: "user",
          timestamp: "2023-06-15T13:15:00Z",
        },
        {
          id: "m2",
          content:
            "I'm sorry to hear that. Could you try clearing your browser cache and reloading the page?",
          sender: "ai",
          timestamp: "2023-06-15T13:16:00Z",
        },
        {
          id: "m3",
          content: "Still not working. This is frustrating.",
          sender: "user",
          timestamp: "2023-06-15T13:18:00Z",
        },
      ],
    },
    {
      id: "3",
      user: {
        name: "Michael Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      },
      timestamp: "2023-06-15T10:45:00Z",
      messages: [
        {
          id: "m1",
          content: "Can you explain how the analytics feature works?",
          sender: "user",
          timestamp: "2023-06-15T10:45:00Z",
        },
        {
          id: "m2",
          content:
            "The analytics feature tracks user engagement and provides insights on usage patterns. You can view different metrics like active users, session duration, and feature adoption.",
          sender: "ai",
          timestamp: "2023-06-15T10:46:00Z",
        },
        {
          id: "m3",
          content: "I see. And can I export these analytics?",
          sender: "user",
          timestamp: "2023-06-15T10:47:00Z",
        },
      ],
    },
  ],
  onSelectConversation = () => {},
  selectedUserId = null,
}: ConversationFeedbackPanelProps) => {
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Get the first conversation for the selected user or the first conversation in the list
  useEffect(() => {
    if (conversations.length > 0) {
      let userConversation;

      if (selectedUserId) {
        // Find the first conversation for the selected user
        // Check multiple patterns for conversation IDs
        userConversation = conversations.find(
          (conv) =>
            conv.id === selectedUserId ||
            conv.id.startsWith(`${selectedUserId}-`) ||
            conv.id.includes(`-${selectedUserId}`) ||
            (conv.user &&
              conv.user.name &&
              conv.user.name
                .toLowerCase()
                .includes(selectedUserId.toLowerCase())),
        );
      }

      // If no user-specific conversation found or no user selected, use the first one
      setActiveConversation(userConversation || conversations[0]);
    } else {
      setActiveConversation(null);
    }
  }, [conversations, selectedUserId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const handleCloseChat = () => {
    setActiveConversation(null);
  };

  return (
    <Card className="h-full w-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {selectedUserId ? "User Conversation" : "Conversation"}
          </CardTitle>
          {activeConversation && (
            <Button variant="ghost" size="icon" onClick={handleCloseChat}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close conversation</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {activeConversation ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div>
                  <h3 className="font-medium">
                    {activeConversation.user.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    <Clock className="inline h-3 w-3 mr-1" />
                    {formatDate(activeConversation.timestamp)}
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-2" />

            <ScrollArea className="flex-1 h-[500px] pr-4">
              <div className="space-y-4">
                {activeConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {formatDate(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[500px] text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No conversation selected</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Select a user to view their conversation
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConversationFeedbackPanel;
