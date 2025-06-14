import { Box, CircularProgress, Typography } from '@mui/material';
import styled from '@emotion/styled';
import ChatFooter from './ChatFooter';
import { useContext, useState, useEffect } from 'react';
import { getMessages, newMessage, uploadFile } from '../../../service/api';
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

const Container = styled(Box)`
  padding: 7px;
  width: 100%;
  box-sizing: border-box;
`;

const UploadProgress = styled(Box)`
  display: flex;
  align-items: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin: 10px;
`;

const ChatMessage = ({ person, conversation }) => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const account = useContext(AccountContext);
  const [messageFlag, setMessageFlag] = useState(false);

  useEffect(() => {
    const getMessageDetails = async () => {
      if (conversation?._id) {
        try {
          setLoading(true);
          const data = await getMessages(conversation._id);
          setMessages(data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    getMessageDetails();
  }, [person._id, conversation._id, messageFlag]);

  const handleFileUpload = async (file) => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await uploadFile(formData, (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      });
      console.log('File in chatmessage:', file);
      await newMessage({
      senderId: account.account.sub,
      receiverId: person.sub,
      conversationId: conversation._id,
      type: 'file',
      text: file.name,
      file: file
      });


      // Refresh messages
      setMessageFlag(prev => !prev);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError(error.message || 'File upload failed');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13 && value.trim()) {
      try {
        setLoading(true);
        
        await newMessage({
          senderId: account.account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: 'text',
          text: value
        });

        setValue('');
        setMessageFlag(prev => !prev);
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Wrapper>   
      <Component loading={loading}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {messages.map((message, index) => (
              <Container key={index}>
                <Message message={message} />
              </Container>
            ))}
            {isUploading && (
              <UploadProgress>
                <CircularProgress variant="determinate" value={uploadProgress} size={24} />
                <Typography variant="body2" sx={{ ml: 2 }}>
                  Uploading... {uploadProgress}%
                </Typography>
              </UploadProgress>
            )}
            {uploadError && (
              <Typography color="error" sx={{ p: 2 }}>
                {uploadError}
              </Typography>
            )}
          </>
        )}
      </Component>
      <ChatFooter 
        sendText={sendText} 
        setValue={setValue} 
        value={value}
        onFileChange={handleFileUpload}
        disabled={isUploading}
      />
    </Wrapper>
  );
};

export default ChatMessage;