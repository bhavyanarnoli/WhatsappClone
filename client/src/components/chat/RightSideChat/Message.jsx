
import {Box, Typography, styled} from '@mui/material';  
const Message = ({message}) => {
  return (
    <Box>
    <Typography> {message.text}</Typography>
    <Typography> {message.createdAt}</Typography>
    </Box>
)

}
export default Message;