import { Box, CircularProgress } from '@mui/material';
import styled from '@emotion/styled';
import ChatFooter from './ChatFooter';
import { useContext, useState, useEffect } from 'react';
import { getMessages, newMessage } from '../../../service/api';
import { AccountContext } from '../../../context/AccountProvider';
import Message from './Message';

const Wrapper = styled(Box)`
  background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
  background-size: cover;
  background-size: 50%;
`;

const Component = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.loading ? 'center' : 'flex-start'};
  align-items: ${props => props.loading ? 'center' : 'flex-start'};
`;

const ChatMessage = ({ person, conversation }) => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const account = useContext(AccountContext);

  useEffect(() => {
    const getMessageDetails = async () => {
      if (conversation?._id) {
        try {
          setLoading(true);
          console.log('Fetching messages for conversation:', conversation._id);
          let data = await getMessages(conversation._id);
          setMessages(data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    
    getMessageDetails();
  }, [person._id, conversation._id]);

  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      if (!value.trim() || !conversation?._id) return;
      
      let message = {
        senderId: account.sub,
        receiverId: person.sub,
        conversationId: conversation._id,
        type: 'text',
        text: value,
      }
      
      try {
        setLoading(true);
        await newMessage(message);
        setValue('');
        let data = await getMessages(conversation._id);
        setMessages(data);
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Wrapper>   
      <Component loading={loading}>
        {loading ? (
          <CircularProgress />
        ) : (
          messages && messages.map((message, index) => (
            <Message key={index} message={message} />
          ))
        )}
      </Component>
      <ChatFooter sendText={sendText} setValue={setValue} value={value} />
    </Wrapper>
  );
}

export default ChatMessage;