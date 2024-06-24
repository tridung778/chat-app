import { useRecipient } from "@/hooks/useRecipients";
import { Conversation, IMessage } from "@/types";
import { styled } from "styled-components";
import RecipientAvatar from "./RecipientAvatar";
import { convertFirebaseTimestampToDate } from "@/utils/getMessageinConversation";

const StyledRecipientHeader = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  align-items: center;
  padding: 11px;
  height: 50px;
  border-bottom: 1px solid whitesmoke;
`;

const StyledHeaderInfo = styled.div`
  flex-grow: 1;
  > h3 {
    margin-top: 0;
    margin-bottom: 3px;
  }
  > span {
    font-size: 14px;
    color: gray;
  }
`;

const StyledH3 = styled.h3`
  word-break: break-all;
`;

const ConversationScreen = ({
  conversation,
  messages,
}: {
  conversation: Conversation;
  messages: IMessage[];
}) => {
  const conversationUsers = conversation.users;

  const { recipientEmail, recipient } = useRecipient(conversationUsers);

  return (
    <StyledRecipientHeader>
      <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />

      <StyledHeaderInfo>
        <StyledH3>
            {recipientEmail}
        </StyledH3>
            {recipient && <span>Last Active: {convertFirebaseTimestampToDate(recipient.lastSeen)}</span>}
      </StyledHeaderInfo>
    </StyledRecipientHeader>
  );
};

export default ConversationScreen;
