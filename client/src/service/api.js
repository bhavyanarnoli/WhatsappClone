import axios from 'axios';

const url = 'http://localhost:8000';

export const addUser = async (data) => {
  try{
    await axios.post(`${url}/add`, data);
  }
  catch(error){
    console.log('Error while addUser API', error.message);
    }
}

export const getUsers = async () => {
  try{
    let response=  await axios.get(`${url}/users`);
    console.log(response);
    return response.data;
  }
  catch(error){
    console.log('Error while getUsers API', error.message);
  }
}

export const setConversation = async (data) => {
  try {
    const response = await axios.post(`${url}/conversation/add`, data);
    return response.data;
  } catch(error) {
    console.log('Error while setConversation API', error.response?.data || error.message);
    throw error; 
  }
}

export const getConversation = async (data) => {
  try {
    let response = await axios.post(`${url}/conversation/get`, data);
    return response.data;
  } catch(error) {
    console.log('Error while getConversation API', error.response?.data || error.message);
    throw error; 
  }
}

export const newMessage = async (data) => {
  try {
    let response = await axios.post(`${url}/messages/add`, data);
    return response.data;
  } catch(error) {
    console.log('Full error details:', error);
  }
}

export const getMessages = async (id) => {
  try {
    let response = await axios.post(`${url}/messages/get/${id}`);
    return response.data;
  } catch(error) {
    console.log('Error while fetching messages:', error.message);
    return []; 
  }
}