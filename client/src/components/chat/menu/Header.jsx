import { useContext, useState } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { Box, styled } from "@mui/material";
import { Chat as MessageIcon, BlurCircular } from "@mui/icons-material";
import MoreOnClick from "./Moreonclick";
import InfoDrawer from "../../Drawer/InfoDrawer";

const Component = styled(Box)`
  height: 44px;
  background: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const Wrapper = styled(Box)`
  margin-left: auto;
  & > * {
    margin-left: 6px;
    padding: 8px;
    color: #000;
  }
  & > :first-child {
    margin-right: 8px;
    font-size: 24px;
    margin-top: 3px;
  }
`;

const Image = styled("img")({
  height: 40,
  width: 40,
  borderRadius: "50%",
  cursor: "pointer",
});

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { account } = useContext(AccountContext);

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <Component>
        {account?.picture && (
          <Image src={account.picture} alt="dp" onClick={toggleDrawer} />
        )}
        <Wrapper>
          <BlurCircular />
          <MessageIcon />
          <MoreOnClick />
        </Wrapper>
      </Component>
      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </>
  );
};

export default Header;
