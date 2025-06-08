import { useEffect, useState, useContext} from "react";
import {Box,styled, Divider} from "@mui/material";
import { getUsers } from "../../../service/api";
import { AccountContext } from "../../../context/AccountProvider";
import { Suspense, lazy } from "react";
import React from "react";
const Conversation = lazy(() => import("./conversation"));

const Component = styled(Box)`
  height: 81vh;
  overflow: overlay;
`;
const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background-color: #e9edef;
`
const Conversations = ({text}) => {
  const { account } = useContext(AccountContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await getUsers();
      if (text) {
        response = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase())); 
      }
      setUsers(response);
    };
    fetchData();
  }, [text]);

return (
  <Suspense fallback={<div>Loading...</div>}>
    <Component>
      {
      users.map(user => {
        if (user.sub === account.sub) return null;
        return (
          <React.Fragment key={user._id}>
            <Conversation user={user} />
            <StyledDivider />
          </React.Fragment>
        )
      })}
    </Component>
  </Suspense>
)};

export default Conversations;
