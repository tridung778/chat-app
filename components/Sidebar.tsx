import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Input,
  TextField,
  Tooltip,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import * as EmailValidator from "email-validator";
import { addDoc, collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Conversation } from "@/types";

const StyledContainer = styled.div`
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 60px;
  border-bottom: 1px solid whitesmoke;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;

const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 2px;
`;

const StyledSideBarButton = styled(Button)`
  width: 100%;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`;

const StyledUserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const SideBar = () => {
  const [loggedUser, _loading, _error] = useAuthState(auth);

  const [isOpenConversationDialog, setisOpenConversationDialog] =
    useState(false);

  const [recipientEmail, setrecipientEmail] = useState("");

  const toggleNewConversationDialog = (isOpen: boolean) => {
    setisOpenConversationDialog(isOpen);

    if (!isOpen) {
      setrecipientEmail("");
    }
  };

  const queryGetConversationsForUser = query(
    collection(db, "conversations"),
    where("users", "array-contains", loggedUser?.email)
  );

  const [conversationsSnapshot] = useCollection(queryGetConversationsForUser);

  const isConversationAlreadyExists = (recipientEmail: string) => {
    return conversationsSnapshot?.docs.find(
      (conversation) =>
        (conversation.data() as Conversation).users.includes(recipientEmail)
    )
  };

  const isInvitSelf = recipientEmail === loggedUser?.email;

  const createConversation = async () => {
    if (!recipientEmail) return;

    if (EmailValidator.validate(recipientEmail) && !isInvitSelf) {
      await addDoc(collection(db, "conversations"), {
        users: [loggedUser?.email, recipientEmail],
      });
    }

    toggleNewConversationDialog(false);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledContainer>
      <StyledHeader>
        <Tooltip title={loggedUser?.email} placement="right">
          <StyledUserAvatar src={loggedUser?.photoURL || ""} />
        </Tooltip>

        <div>
          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>

          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </div>
      </StyledHeader>

      <StyledSearch>
        <SearchIcon />
        <Input placeholder="Search" color="warning" />
      </StyledSearch>

      <StyledSideBarButton onClick={() => toggleNewConversationDialog(true)}>
        Start a new conversation
      </StyledSideBarButton>
      <Dialog
        open={isOpenConversationDialog}
        onClose={() => toggleNewConversationDialog(false)}
      >
        <DialogTitle>New Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a Google email address for the user you wish to chat
            with.
          </DialogContentText>
          <TextField
            autoFocus
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={recipientEmail}
            onChange={(e) => setrecipientEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleNewConversationDialog(false)}>
            Cancel
          </Button>
          <Button disabled={!recipientEmail} onClick={createConversation}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default SideBar;
