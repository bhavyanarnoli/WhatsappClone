import {Box, styled, Typography} from '@mui/material';
import { useContext } from 'react';
import { AccountContext } from '../../context/AccountProvider';
const Component = styled(Box)`
  display: flex;
  justify-content: center;
`;

const Image = styled("img")({
  height: 200,
  width: 200,
  borderRadius: "50%",
  padding: "25px 0",
  cursor: "pointer",
});

const BackWrapper = styled(Box)`
  background: #ffffff;
  padding: 12px 30px 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  & > :first-of-type {
    font-size: 13px;
    color: #009688;
    font-weight: 500;

  }

  & > :last-of-type {
    margin: 14px 0;
    font-weight: 500;
    color: #4a4a4a;
  }

`;

const DescriptionContainer = styled(Box)`
  padding: 15px 20px 28px 30px;
  & > p {
    font-size: 13px;
    color: #8696a0;  
  }

`
const ProfilePicture = () => {
  const { account } = useContext(AccountContext);
  
  return( 
    <>
      <Component>
        {account?.picture && (
          <Image src={account.picture} alt="dp" />
        )}
      </Component>
      <BackWrapper>
        <Typography >Your name</Typography>
        <Typography> {account.name}</Typography>

      </BackWrapper>
      <DescriptionContainer>
        <Typography>This is not your username or pin. This name will be visible to your whatsapp contacts.</Typography>
      </DescriptionContainer>
        <BackWrapper>
        <Typography>About</Typography>
        <Typography> This is the default one</Typography>

      </BackWrapper>

  </>

  )
}

export default ProfilePicture;