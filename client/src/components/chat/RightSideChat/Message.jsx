import {Box, Typography, styled} from '@mui/material';  
import { formatDate } from '../../../utils/commonutils';
import { useContext } from 'react';
import { AccountContext } from '../../../context/AccountProvider';

const SentCss = styled(Box)`
  background: #dcf8c6;
  max-width: 60%;
  margin-left: auto;
  padding: 8px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
  margin-bottom: 10px;
`;

const ReceivedCss = styled(Box)`
  background: #ffffff;
  max-width: 60%;
  padding: 8px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
  margin-bottom: 10px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: auto;
  margin-left: 5px;
  word-break: keep-all;
`;

const Text = styled(Typography)`
  font-size: 14px;    
  padding: 0 5px;
`;

const Message = ({message}) => {
  const { account } = useContext(AccountContext);
  return (
    <>
      {account.sub === message.senderId ? (
        <SentCss>
          <Text>{message.text}</Text>
          <Time>{formatDate(message.createdAt)}</Time> 
        </SentCss>
      ) : (
        <ReceivedCss>
          <Text>{message.text}</Text>
          <Time>{formatDate(message.createdAt)}</Time>
        </ReceivedCss>
      )}
    </>
  );
};

export default Message;