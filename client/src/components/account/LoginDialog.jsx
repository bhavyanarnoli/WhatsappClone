import { Dialog, Box, Typography, List, ListItem, styled } from "@mui/material";
import { qrCodeImage } from "../constants/data";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";

const dialogStyle = {
  height: '96%',
  marginTop: '12%',
  width: '60%',
  maxWidth: '100%',
  maxHeight: '100%',
  boxShadow: 'none',
  overflow: 'hidden',
};

const Component = styled(Box)`
  display: flex;
`;

const LeftContainer = styled(Box)`
  padding: 56px 0 56px 56px;
`;

const QrCode = styled('img')({
  height: 264,
  width: 264,
  margin: '50px 0 0 50px'
});

const Title = styled(Typography)`
  font-size: 26px;
  color: #525252;
  font-weight: 300;
  font-family: inherit;
  margin-bottom: 25px;
`;

const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;
const LowerHelpText = styled(Typography)`
  font-size: 14px;
  margin-top: 100px;
  margin-bottom: 25px;
  font-weight:  1000;
  color:rgb(7, 80, 70);
`;

const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);
  const onLoginSuccess = (res) => {
    const decoded = jwtDecode(res.credential); 
    console.log(decoded);
    setAccount(decoded);
    };

  const onLoginError = (res) => {
    console.log("Login Failed : ", res);
  };

  return (
    <Dialog
      open={true}
      slotProps={{
        paper: {
          sx: dialogStyle,
        }
    
      }}
      hideBackdrop={true}
    >
      <Component>
        <LeftContainer>
          <Title>To use WhatsApp on your computer</Title>
          <StyledList>
            <ListItem>1. Open WhatsApp on your phone</ListItem>
            <ListItem>2. Tap menu Settings and select WhatsApp Web</ListItem>
            <ListItem>3. Point your phone to this screen to capture the code</ListItem>
          </StyledList>
          <LowerHelpText>Need help to get started? </LowerHelpText>
        </LeftContainer>
        <Box style={{ position: 'relative' }}> 
          <QrCode src={qrCodeImage} alt="QR Code" />
          <Box style = {{position: 'absolute', top: '50%', transform: 'translateX(25%)'}}> 
            <GoogleLogin
              onSuccess={onLoginSuccess}
              onError={onLoginError}
            />
          </Box>
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
