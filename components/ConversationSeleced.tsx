import { useRecipient } from "@/hooks/useRecipients";
import { Conversation } from "@/types";
import { styled } from "styled-components";
import RecipientAvatar from "./RecipientAvatar";
import { useRouter } from "next/router";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-all;

  :hover {
    background-color: #e9eaeb;
  }
`;

const ConversationSeleced = ({
  id,
  conversationUsers,
}: {
  id: string;
  conversationUsers: Conversation["users"];
}) => {
  const { recipient, recipientEmail } = useRecipient(conversationUsers);

  const router = useRouter();

  const onSeleceConversation = () => {
    router.push(`/conversations/${id}`);
  };

  return (
    <StyledContainer onClick={onSeleceConversation}>
      <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
      <span>{recipientEmail}</span>
    </StyledContainer>
  );
};

export default ConversationSeleced;
