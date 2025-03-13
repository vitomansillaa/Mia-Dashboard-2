import React from "react";
import ConversationFeedbackPanel from "./ConversationFeedbackPanel";

interface UserConversationsProps {
  userId: string;
  conversations: any[];
}

const UserConversations = ({
  userId,
  conversations,
}: UserConversationsProps) => {
  return (
    <ConversationFeedbackPanel
      conversations={conversations}
      selectedUserId={userId}
    />
  );
};

export default UserConversations;
