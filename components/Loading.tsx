import { styled } from "styled-components";
import Image from "next/image";
import WhatsAppLogo from "../assets/whatsapplogo.png";
import { CircularProgress } from "@mui/material";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledImageWapper = styled.div`
  margin-bottom: 50px;
`;

const Loading = () => {
  return (
    <StyledContainer>
      <StyledImageWapper>
        <Image src={WhatsAppLogo} alt="Whatsapp" height={200} width={200} />
      </StyledImageWapper>
      <CircularProgress />
    </StyledContainer>
  );
};

export default Loading;
