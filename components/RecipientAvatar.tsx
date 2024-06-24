import { useRecipient } from "@/hooks/useRecipients";
import { AppUser } from "@/types";
import { Avatar } from "@mui/material";
import { styled } from "styled-components";

type Props = ReturnType<typeof useRecipient>;

const StyledAvatar = styled(Avatar)`
  margin: 5px 15px 5px 5px;
`;

const RecipientAvatar = ({ recipient, recipientEmail }: Props) => {
  return recipient?.photoUrl ? (
    <StyledAvatar src={recipient.photoUrl} />
  ) : (
    <StyledAvatar>{recipientEmail && recipientEmail[0].toUpperCase()}</StyledAvatar>
  );
};

export default RecipientAvatar;
