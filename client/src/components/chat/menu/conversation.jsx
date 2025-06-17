import {Box, Typography,styled, Skeleton} from '@mui/material';
import { useContext,useState } from 'react';
import { AccountContext } from '../../../context/AccountProvider';
import { setConversation } from '../../../service/api';

const Component = styled(Box)`
  display: flex;
  height: 45px;
  padding: 13px 0;
  cursor: pointer;
  align-items: center;
`

const Image = styled("img")({
  height: 40,
  width: 40,
  borderRadius: "50%",
  cursor: "pointer",
  padding: '0 14px',
  objectFit: 'cover',
  backgroundColor: '#f0f2f5', // fallback color while loading
});
 
const Conversation = ({ user }) => {
  const { setPerson, account } = useContext(AccountContext);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getUser = async () => {
    setPerson(user);
    await setConversation({ senderId: account.sub, receiverId: user.sub });
  };

  return (
    <Component onClick={getUser}>
      <Box>
        {!imageLoaded && (
          <Skeleton variant="circular" width={40} height={40} />
        )}
        <Image 
          src={user.picture} 
          alt="dp" 
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </Box>
      <Box ml={2}>
        <Typography>{user.name}</Typography>
      </Box>
    </Component>
  );
};
 
export default Conversation;