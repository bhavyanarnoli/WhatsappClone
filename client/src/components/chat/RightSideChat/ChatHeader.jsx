import {Box, Typography, styled} from '@mui/material';
import { useContext } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { Search, MoreVert } from '@mui/icons-material';
const Image = styled("img")({
  height: 40,
  width: 40,
  borderRadius: "50%",
  cursor: "pointer",
});
const Component = styled(Box)`
  display: flex;
  height: 44px;
  background: #ededed;
  padding: 8px 16px;
  align-items: center;
`
const Name = styled(Typography)`
    margin-left: 12px !important;
`;

const RightContainer = styled(Box)`
    margin-left: auto;
    & > svg {
        padding: 8px;
        font-size: 22px;
        color: #000;
    }
`;

const Status = styled(Typography)`
    font-size: 12px !important;
    color: rgb(0, 0, 0, 0.6);
    margin-left: 12px !important;
`;



const ChatHeader = ( {account} ) => {
  const { activeUsers } = useContext(AccountContext);
    return (
      
      <Component>
          <Image src={ account.picture} alt="dp"  />
          <Box>
          <Name> {account.name} </Name>
          <Status> {activeUsers?.find(user => user.sub === account.sub) ? 'Online' : 'Offline' }</Status>
          </Box>
          <RightContainer>
            <Search/>
            <MoreVert />
          </RightContainer>
      </Component>
  )
}
export default ChatHeader;