import { Dialog } from "@mui/material";

const dialogStyle = {
  height: '96%',
  marginTop: '12%',
  width: '60%',
  maxWidth: '100%',
  maxHeight: '100%',
  boxShadow: 'none',
  overflow: 'none',
};

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
    <Box>
      <Box>
    

      </Box>
      <Box>
      

      </Box>


    </Box>
    Hello
    </Dialog>
  );
};

export default LoginDialog;
