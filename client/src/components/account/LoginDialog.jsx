import { Dialog, Box, Typography, List, ListItem, styled } from "@mui/material";
import { qrCodeImage } from "../constants/data";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

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

const LoginDialog = () => {
  const onLoginSuccess = (res) => {
    const decoded = jwt_decode(res.credential);
    console.log(decoded);
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
        },
      }}
    >
      <Component>
        <LeftContainer>
          <Title>To use WhatsApp on your computer</Title>
          <StyledList>
            <ListItem>1. Open WhatsApp on your phone</ListItem>
            <ListItem>2. Tap menu Settings and select WhatsApp Web</ListItem>
            <ListItem>3. Point your phone to this screen to capture the code</ListItem>
          </StyledList>
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
