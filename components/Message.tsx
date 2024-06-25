import { auth } from "@/config/firebase";
import { IMessage } from "@/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { styled } from "styled-components";

const StyledMessage = styled.p`
  width: fit-content;
  word-break: break-all;
  max-width: 90%;
  min-width: 30%;
  padding: 15px 15px 30px;
  border-radius: 8px;
  margin: 10px;
  position: relative;
`;

const SenderMessage = styled(StyledMessage)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

const RecipientMessage = styled(StyledMessage)`
  background-color: whitesmoke;
`;

const StyledTimestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;

const Message = ({ message }: { message: IMessage }) => {
  const [loggedInUser] = useAuthState(auth);
  const MessagesType =
    loggedInUser?.email === message.user ? SenderMessage : RecipientMessage;
  //   console.log('loggedInUser?.email');

  return (
    <MessagesType>
      {message.text}
      <StyledTimestamp>{message.sent_at}</StyledTimestamp>
    </MessagesType>
  );
};

export default Message;
