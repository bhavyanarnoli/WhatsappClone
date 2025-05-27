import { Dialog } from '@mui/material';
const dialogStyle = {
  height: '95%',
  width: '100%',
  margin : '20px',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: '0px',
  boxShadow: 'none',
  overflow: 'hidden',
};


const ChatDialog = () => {
  return <Dialog open ={true}    
      slotProps={{
        paper: {
          sx: dialogStyle,
        }}}>
      </Dialog>
}

export default ChatDialog;