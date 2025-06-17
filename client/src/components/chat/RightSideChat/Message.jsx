import { Box, Typography, styled, CircularProgress } from '@mui/material';
import { Download } from '@mui/icons-material';
import { formatDate } from '../../../utils/commonutils';
import { useContext, useState, useEffect } from 'react';
import { AccountContext } from '../../../context/AccountProvider';

// Styled components for message bubbles
const Own = styled(Box)({
  background: '#dcf8c6',
  maxWidth: '60%',
  marginLeft: 'auto',
  padding: '8px',
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
  wordBreak: 'break-word',
  marginBottom: '10px',
});

const Wrapper = styled(Box)({
  background: '#ffffff',
  maxWidth: '60%',
  padding: '8px',
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
  wordBreak: 'break-word',
  marginBottom: '10px',
});

const Time = styled(Typography)({
  fontSize: '10px',
  color: '#919191',
  marginLeft: 'auto',
  marginTop: '4px',
  wordBreak: 'keep-all',
});

const Text = styled(Typography)({
  fontSize: '14px',
  padding: '0 5px',
});

const ImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  maxWidth: '300px',
  marginBottom: '8px',
});

const StyledImage = styled('img')({
  width: '100%',
  maxHeight: '400px',
  borderRadius: '8px',
  display: 'block',
  objectFit: 'contain',
  transition: 'opacity 0.3s ease',
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
});

const ErrorContainer = styled(Box)({
  padding: '12px',
  backgroundColor: '#ffebee',
  borderRadius: '8px',
  color: '#d32f2f',
  textAlign: 'center',
});

const FileContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  marginBottom: '8px',
});

const Message = ({ message }) => {
  const { account } = useContext(AccountContext);
  const [imageState, setImageState] = useState({
    loading: true,
    error: false,
    url: '',
    loaded: false
  });

  const isOwnMessage = message.senderId === account.sub;
  const Component = isOwnMessage ? Own : Wrapper;

  // Determine if message contains an image
  const isImage = message.type === 'file' && (
    message.isImage || 
    message.file?.type?.startsWith('image/') || 
    /\.(jpe?g|png|gif|webp|bmp|svg)$/i.test(message.file?.filename || message.text)
  );

  // Determine if message contains a non-image file
  const isFile = message.type === 'file' && !isImage;

  useEffect(() => {
    if (isImage) {
      const constructImageUrl = () => {
        if (message.file?.url?.startsWith('http')) {
          return message.file.url;
        }
        
        const url = message.text;
        return url;
      };

      const imageUrl = constructImageUrl();
      
      const img = new Image();
      img.src = imageUrl;
      
      img.onload = () => {
        setImageState(prev => ({ 
          ...prev, 
          url: imageUrl,
          loading: false,
          loaded: true
        }));
      };
      
      img.onerror = () => {
        console.error('Failed to load image:', imageUrl);
        setImageState(prev => ({ 
          ...prev, 
          loading: false, 
          error: true 
        }));
      };
    }
  }, [message, isImage]);

  const getDisplayName = () => {
    return message.file?.originalName || message.text || 'File';
  };

  return (
    <Component>
      {message.type === 'text' ? (
        <>
          <Text>{message.text}</Text>
          <Time>{formatDate(message.createdAt)}</Time>
        </>
      ) : isImage ? (
        <>
          <ImageContainer>
            {imageState.loading && (
              <LoadingContainer>
                <CircularProgress size={24} />
                <Typography variant="body2" sx={{ ml: 2 }}>
                  Loading image...
                </Typography>
              </LoadingContainer>
            )}
            {!imageState.error && imageState.url && (
              <StyledImage
                src={imageState.url}
                alt={getDisplayName()}
                loading="lazy"
                style={{ 
                  opacity: imageState.loaded ? 1 : 0,
                  display: imageState.loading ? 'none' : 'block'
                }}
              />
            )}
            {imageState.error && (
              <ErrorContainer>
                <Typography variant="body2">
                  Could not load image: {getDisplayName()}
                </Typography>
              </ErrorContainer>
            )}
          </ImageContainer>
          <Box display="flex" alignItems="center">
            <Text>{getDisplayName()}</Text>
            <Time>{formatDate(message.createdAt)}</Time>
          </Box>
        </>
      ) : isFile ? (
        <Box display="flex" flexDirection="column">
          <FileContainer>
            <Download fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">{getDisplayName()}</Typography>
          </FileContainer>
          <Time>{formatDate(message.createdAt)}</Time>
        </Box>
      ) : (
        <Typography color="textSecondary">[Unsupported message type]</Typography>
      )}
    </Component>
  );
};

export default Message;