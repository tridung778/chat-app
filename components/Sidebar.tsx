import { Avatar, Button, IconButton, Input, Tooltip } from "@mui/material"
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import styled from "styled-components"

const StyledContainer = styled.div`
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;
    border-right: 1px solid whitesmoke;
`

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
`

const StyledSearch = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 2px;
`

const StyledSideBarButton = styled(Button)`
    width: 100%;
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
`

const StyledUserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`

const SideBar = () => {
    return <StyledContainer>
        <StyledHeader>
            <Tooltip title="Profile" placement="right">
                <StyledUserAvatar />
            </Tooltip>

            <div>
                <IconButton>
                    <ChatIcon />
                </IconButton>

                <IconButton>
                    <MoreVertIcon />
                </IconButton>

                <IconButton>
                    <LogoutIcon />
                </IconButton>
            </div>
        </StyledHeader>

        <StyledSearch>
            <SearchIcon />
            <Input placeholder="Search" color="warning" />
        </StyledSearch>

        <StyledSideBarButton>
            Start a new conversation
        </StyledSideBarButton>
    </StyledContainer>
}

export default SideBar