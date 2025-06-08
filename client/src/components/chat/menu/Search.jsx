import { Search as SearchIcon } from '@mui/icons-material';
import { InputBase, Box } from '@mui/material';
import { styled } from '@mui/system'; 

const Component = styled(Box)`
  background: #fff;
  height: 45px;
  margin-top: 10px;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
`;
 
const InputField = styled(InputBase)`
  width: 100%;
  padding: 16%
  height: 15px;
  font-size: 14px;
  padding-left: 65px;
`
const Wrapper = styled(Box)`
 padding-top: 10px;
  background: #f0f2f5;
  position: relative;
  width: 100%;
  border-radius: 10px;
`
const Icon = styled(Box)`
  position: absolute;
  height: 100%;
  padding: 5px 20px;
  color: #919191;
`;

const Search = ({setText}) => {
  return (
    <Component>
      <Wrapper>
      <Icon>
        <SearchIcon fontSize='small' />
      </Icon>
      <InputField
        placeholder="Search or start New Chat"
        onChange={(e) => setText(e.target.value)}
      />
      </Wrapper>
    </Component>
  );
};

export default Search;
