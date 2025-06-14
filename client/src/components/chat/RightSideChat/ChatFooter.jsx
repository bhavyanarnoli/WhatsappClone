import {Box, InputBase, styled} from '@mui/material';
import { EmojiEmotionsOutlined, AttachFile, Mic } from '@mui/icons-material';
import { useState } from 'react';

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0px 15px;
  & > * {
    margin: 5px;
    color: #919191;
  }
`;

const MessageBox = styled(Box)`
  background-color: #ffffff;  
  border-radius: 18px;
  width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 20px;
  height: 20px;  
  padding-left: 25px;
  font-size: 14px;
`;

const ClipIcon = styled(AttachFile)`
  transform: rotate(40deg);
`;

const ChatFooter = ({ sendText, setValue, value, onFileChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileChange(e.target.files[0]);
      setValue(e.target.files[0].name);
    }
  };

  return (  
    <Container> 
      <EmojiEmotionsOutlined />
      <label htmlFor="fileInput">
        <ClipIcon />
      </label>
      <input 
        type="file" 
        id="fileInput"
        style={{display: 'none'}}
        onChange={handleFileChange}
      />
      <MessageBox>
        <InputField  
          placeholder="Type a message"
          onChange={(e) => setValue(e.target.value)} 
          onKeyDown={sendText}
          value={value}
        />
      </MessageBox>
      <Mic />
    </Container>
  );
};

export default ChatFooter;