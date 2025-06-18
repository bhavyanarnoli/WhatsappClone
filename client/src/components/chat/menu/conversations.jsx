import { useEffect, useState, useContext, useMemo } from "react";
import {Box, styled, Divider, Skeleton} from "@mui/material";
import { getUsers } from "../../../service/api";
import { AccountContext } from "../../../context/AccountProvider";
import Conversation from "./conversation";
import React from "react";

const Component = styled(Box)`
  height: 81vh;
  overflow: overlay;
`;

const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background-color: #e9edef;
`;

const Conversations = ({text}) => {
  const { account , socket, setActiveUsers} = useContext(AccountContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.current.emit("addUsers", account);
    socket.current.on("getUsers", (users) => {
      setActiveUsers(users);
    });
  }, [account]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response = await getUsers();
        if (text) {
          response = response.filter(user => 
            user.name.toLowerCase().includes(text.toLowerCase())
          ); 
        }
        setUsers(response);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [text]);

  const filteredUsers = useMemo(() => 
    users.filter(user => user.sub !== account.sub),
    [users, account.sub]
  );

  if (loading) {
    return (
      <Component>
        {[...Array(8)].map((_, index) => (
          <React.Fragment key={index}>
            <Box display="flex" alignItems="center" p={2}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box ml={2} width="100%">
                <Skeleton variant="text" width="60%" />
              </Box>
            </Box>
            <StyledDivider />
          </React.Fragment>
        ))}
      </Component>
    );
  }

  return (
    <Component>
      {filteredUsers.map(user => (
        <React.Fragment key={user._id}>
          <Conversation user={user} />
          <StyledDivider />
        </React.Fragment>
      ))}
    </Component>
  );
};

export default Conversations;