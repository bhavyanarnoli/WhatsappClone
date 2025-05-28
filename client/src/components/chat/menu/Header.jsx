import { useContext } from "react"; 
import { AccountContext } from "../../../context/AccountProvider";
import { Box, styled} from "@mui/material";
import BlurCircularIcon from '@mui/icons-material/BlurCircular';
import {Chat as MessageIcon, BlurCircular} from '@mui/icons-material';
import MoreOnClick from "./Moreonclick";
const Component = styled(Box)`
  height: 44px;
  background: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  `

const Wrapper = styled(Box)`
  margin-left:auto;
  & > * {  
    margin-left: 6px;
    padding: 8px;
    color: #000;
}
  & > :first-child {
    margin-right: 8px;
    font-size: 24px;
    margin-top: 3px;
  }
  & > :hover {
    background: #f5f5f5;
    border-radius: 50%;
`
const Image = styled('img')({
  height: 40,
  width: 40,
  borderRadius: '50%',
})

const Header = () => {
  const { account } = useContext(AccountContext);
  return (
    <> 
     <Component>
      <img src={account.picture} alt="dp" />
      <Wrapper>
      <BlurCircular/>
      <MessageIcon /> 
      <MoreOnClick />
      </Wrapper>
    </Component>
    </>)
}

export default Header;