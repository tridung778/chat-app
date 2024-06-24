import SideBar from "@/components/Sidebar";
import { auth, db } from "@/config/firebase";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { styled } from "styled-components";
import type { Conversation, IMessage } from "@/types";
import { getRecipientEmail } from "@/utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  generateQueryGetMessages,
  transformMessage,
} from "@/utils/getMessageinConversation";
import ConversationScreen from "@/components/ConversationScreen";

interface Props {
  conversation: Conversation;
  messages: IMessage[];
}

const StyledContainer = styled.div`
  display: flex;
`;

const StyledConversationContainer = styled.div`
  flex-grow: 1;
  overflow: scroll;
  height: 100vh;
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Conversation = ({ conversation, messages }: Props) => {
  const [loggedUser, _loading, _error] = useAuthState(auth);
  return (
    <StyledContainer>
      <Head>
        <title>
          Conversation with {""}
          {getRecipientEmail(conversation.users, loggedUser)}
        </title>
      </Head>

      <SideBar />

      <StyledConversationContainer>
        <ConversationScreen
          conversation={conversation}
          messages={messages}
        />
      </StyledConversationContainer>
    </StyledContainer>
  );
};

export default Conversation;

export const getServerSideProps: GetServerSideProps<
  Props,
  { id: string }
> = async (context) => {
  const conversationId = context.params?.id;

  const conversatinoRef = doc(db, "conversations", conversationId as string);

  const convarsationSnapshot = await getDoc(conversatinoRef);

  // Get all messages between logged in user

  const queryMessages = generateQueryGetMessages(conversationId);

  const messagesSnapshot = await getDocs(queryMessages);

  const messages = messagesSnapshot.docs.map((doc) => transformMessage(doc));

  return {
    props: {
      conversation: convarsationSnapshot.data() as Conversation,
      messages,
    },
  };
};
