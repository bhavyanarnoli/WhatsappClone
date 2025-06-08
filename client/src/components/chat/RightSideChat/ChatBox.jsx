import {Box } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import { AccountContext } from "../../../context/AccountProvider";
import { getConversation } from "../../../service/api";

const ChatBox = () => {
  const { account } = useContext(AccountContext);
  const {person} = useContext(AccountContext);
  const [conversation, setConversation] = useState(null);
  
  useEffect(() => {
    const getConversationDetails = async () => {
      try {
        let data = await getConversation({ senderId: account.sub, receiverId: person.sub });
        setConversation(data);
      } catch (error) {
        console.error("Error fetching conversation:", error);
        setConversation(null);
      }
    }
    getConversationDetails();
  }, [person.sub]);

  return (
    <Box style={{ height: "75%" }}>
      <ChatHeader account={person} /> 
      {conversation && <ChatMessage person={person} conversation={conversation} />}
    </Box>
  );
}

export default ChatBox;