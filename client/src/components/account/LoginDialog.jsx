import { Dialog, Box, Typography, List, ListItem, styled } from "@mui/material";
import { qrCodeImage } from "../constants/data";
import { GoogleLogin } from '@react-oauth/google';

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
`
const LeftContainer = styled(Box)`
  padding: 56px 0 56px 56px;
`
const QrCode = styled('img')({
  height: 264,
  width: 264,
  margin: '50px 0 0 50px'
  })

const Title = styled(Typography)`
  font-size: 26px;
  color: #525252;
  font-weight: 300;
  font-family: inherit;
  margin-bottom: 25px;
`;

const styledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`

const LoginDialog = () => {
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
        <Title> To use Whatsapp on your computer</Title>
        <styledList>
          <ListItem> 1. Open Whatsapp on your phone </ListItem>
          <ListItem> 2.Tap menu Settings and select Whatsapp Web </ListItem>
          <ListItem> 3. Point your phone to this screen to capture the code </ListItem>
        </styledList>
      </LeftContainer>
      <Box>
      <QrCode src = {qrCodeImage} alt = "QR Code" />

      </Box>


    </Component>

    </Dialog>
  );
};

export default LoginDialog;
