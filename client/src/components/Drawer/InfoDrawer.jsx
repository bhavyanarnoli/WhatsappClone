
import Drawer from '@mui/material/Drawer';
import { Box, Typography , styled} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
const DrawerStyle = {
  left:20,
  top: 17,
  height: '95%',
  width: '30%',
  boxShadow: 'none',
}

const Header = styled(Box)`
  height: 107px;
  background-color: #008069;
  color: #FFFFFF;
  display: flex;
  & > svg, & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: 600;

}
`;

const Component = styled(Box)`
  background:  #ededed;
  height: 85%

`


const InfoDrawer = ({open, setOpen}) => {
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <>
      <Drawer
      open={setOpen}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: DrawerStyle,
        }
      
      }}
      style = {{zIndex: 1500}}>
     <Header>
        <ArrowBack onclick={handleClose} />
        <Typography> Profile</Typography>
      </Header>
    </Drawer>
      <Component></Component>
    </>
  )
}

export default InfoDrawer;