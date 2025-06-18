import { Server } from "socket.io";

const io = new Server(9000, {
  cors: {
    origin: "http://localhost:3000",
  }

 })

const getUser = (id) => {
  return users.find(user => user.sub === id);
}

let users = [];
const addUser = (userData, socketId) => {
  !users.some(user => user.sub === userData.sub) &&
    users.push({ ...userData, socketId });
}
io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("addUsers", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
 })
  socket.on("sendMessage", (data) => {
    
    const user = getUser(data.receiverId);
    
    if (!user) {
      console.error(`User ${data.receiverId} not found in active users`);
      return;
    }

    console.log(`Sending message to user ${user.sub} on socket ${user.socketId}`);
    io.to(user.socketId).emit('getMessage', data);
  });
});

