import { Button } from "@mui/material"
import Head from "next/head"
import { styled } from "styled-components"
import Image from "next/image"
import WhatsAppLogo from "../assets/whatsapplogo.png"
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'

const StyledContainer = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: whitesmoke;
`

const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`

const StyledImageWapper = styled.div`
  margin-bottom: 50px;
`

const Login = () => {
  const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);

  const signIn = () => {
    signInWithGoogle()
  }
  return <StyledContainer>
    <Head>
      <title>Login</title>
    </Head>

    <StyledLoginContainer>
      <StyledImageWapper>
        <Image src={WhatsAppLogo} alt="Whatsapp" height={200} width={200} />
      </StyledImageWapper>

      <Button variant="outlined" onClick={signIn}>
        Sign In With Google
      </Button>
    </StyledLoginContainer>
  </StyledContainer>
}

export default Login